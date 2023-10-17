from flask import Flask, render_template, request, jsonify, session
import boto3
import tensorflow as tf
from config import key_id
from config import key
import io
from io import BytesIO
import zipfile
import random
from keras.models import load_model
import numpy as np
import pandas as pd


from smart_open import open


from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


# SQLite database path for the Infected data
db_path = 'sqlite:///predictions.db'
engine = create_engine(db_path)




app = Flask(__name__)

app.secret_key = 'monkey55@2023'

#S3 API keys
s3 = boto3.client('s3',
                  aws_access_key_id= key_id,
                  aws_secret_access_key= key)

#Setting up some variables, Change here for database update
#model_key = 'model_keras.h5'
bucket_name = 'p4dreambucket'
#Path for S3 bucket
path = 'imagefile/Raw_Folder/'
#Path for locale datas
csv_path = 'Data/combined_test_New.csv'


def load_csv_to_dataframe(csv_path):
    df = pd.read_sql(' SELECT * FROM combined_test_New', con = engine.raw_connection())
    return df

# def load_csv_to_dataframe(csv_path):
#     return pd.read_csv(csv_path)


df = load_csv_to_dataframe(csv_path)


# Function for getting the column 'target'
def get_target_from_csv(df, filename, image_column="ImageFileName", value_column="Target"):
    # Find the row where the image filename matches
    matched_row = df[df[image_column] == filename]
    
    # If a match is found, return the corresponding value from the desired column
    if not matched_row.empty:
        return matched_row[value_column].values[0]
    else:
        return None

# Function for getting the column CNN/ or the combined model.
def get_prediction_from_csv(df, filename, image_column="ImageFileName", value_column="Predictions"):
    # Find the row where the image filename matches
    matched_row = df[df[image_column] == filename]
    
    # If a match is found, return the corresponding value from the desired column
    if not matched_row.empty:
        return matched_row[value_column].values[0]
    else:
        return None



model_prediction_counts = []
user_prediction_counts = []





# App main here ---------------------------
@app.route('/')
def display_images():
    s3_bucket_name = 'p4dreambucket'
    session.clear()
    ##This line is for reading directly from S3
    #object_list = list_objects_in_bucket(s3_bucket_name)

    # List all images in the csv bucket
    all_image_names = get_image_names_from_csv(csv_path)
    # Randomly select 5 objects (images) from the list
    selected_image_names = random.sample(all_image_names, 5)
    
    #Here will be code to extract Target value from csv
    target_list_csv = []
    for image_filename in selected_image_names:
        value = get_target_from_csv(df, image_filename)  # getting value from target column
        print(f' The VALUE IS: {value}')
        target_list_csv.append(value)
    #Converting numpy.int64 to native int to use in session
    target_list_csv = [int(item) for item in target_list_csv]
    session['target_list_csv'] = target_list_csv
    
   
    #Here will be code to extract predicted value from csv
    prediction_list_csv = []  
    for image_filename in selected_image_names:
        value = get_prediction_from_csv(df, image_filename)  # getting value from predicted
        print(f' The VALUE IS: {value}')
        prediction_list_csv.append(value)            
  


    answer = filter_answer(target_list_csv)
    model_answer = filter_prediction(prediction_list_csv)
    print(f'The SELECTED 5 are:{selected_image_names}')
    print(f'The predictions are :{model_answer}') 
    print(f'The answers are :{answer}') 

    #Storing the model prediction score
    correct_count_prediction = sum(1 for predicted, actual in zip(prediction_list_csv, target_list_csv) if predicted == actual)

    session['correct_count_prediction'] = correct_count_prediction


    # Generate pre-signed URLs for the selected objects
    image_urls = generate_presigned_urls(s3_bucket_name, selected_image_names,path)
    zipped_data = zip_function(image_urls, model_answer,answer)

    print(f'The scores are {scores}')
    
    return render_template('image.html',zipped_data = zipped_data, correct_count_prediction=correct_count_prediction, correct_count_user=None,scores=scores)



def zip_function(x,y,z):
    

    # Zip your lists
    zipped_data = zip(x, y, z)
    
    return zipped_data

#Function to get image names from the CSV:
def get_image_names_from_csv(csv_path):
    df = pd.read_csv(csv_path)
    # column containing image names is called "ImageFileName"
    return df["ImageFileName"].tolist()




#Filtering for images category 
def filter_answer(list):

    # Use list comprehension to filter the list
    filtered_objects = []
    for x in list:
        if x == 1:
            filtered_objects.append('Infected')
            print(f'Yes')
        else:
            filtered_objects.append('Not-Infected')    
            print(f'No')
    print(f'This is the filtered objects {filtered_objects}')
    return  filtered_objects

def filter_prediction(list):
        # Use list comprehension to filter the list
    filtered_prediction = []
    for x in list:
        if x > 0.5:
            filtered_prediction.append('Infected')
            print(f'Yes')
        else:
            filtered_prediction.append('Not-Infected')    
            print(f'No')
    print(f'This is the filtered objects {filtered_prediction}')
    return  filtered_prediction



def generate_presigned_urls(bucket_name, object_keys,path):
    try:
        # Generate pre-signed URLs for the selected objects
        pre_signed_urls = []
        for object_key in object_keys:
            url = s3.generate_presigned_url('get_object',
                                           Params={'Bucket': bucket_name, 'Key':path+ object_key },
                                           ExpiresIn=3600)  # URL expiration time in seconds (adjust as needed)
            pre_signed_urls.append(url)
        return pre_signed_urls
    except Exception as e:
        print(f"Error generating pre-signed URLs: {str(e)}")
        return []

#To store the scores
scores = []
counts=0
@app.route('/submit_choices', methods=['POST'])
def submit_choices():
    
    user_choices = request.json['choices']
    correct_categories = session.get('target_list_csv', [])
    correct_count_prediction = session.get('correct_count_prediction', 0)

    correct_count_user = sum(1 for user_choice, correct_choice in zip(user_choices, correct_categories) if user_choice == correct_choice)
    session['user_score'] = correct_count_user
    print(f'User choices: {user_choices}')
    print(f'The correct categories: {correct_categories}')
    scores.append({
                'User':correct_count_user,
                'Model':correct_count_prediction,                     
                   
                })  # Add the score to the scores list
    print(f'Score Board : {scores}')
    
    global counts
     
    counts = counts + 5
    userTotal, modelTotal, userPercent,modelPercent = get_total_scores()
    print(f'The Totals are:{userTotal} and {modelTotal}')
    print(f'The counts are:{counts}')
    
    return jsonify({'correct_count_user': correct_count_user,'correct_count_prediction': correct_count_prediction , 'scores': scores,'userTotal': userTotal,'modelTotal': modelTotal, 'counts':counts,'userPercent':userPercent,'modelPercent':modelPercent})



def get_total_scores():
    global counts
    global userTotal
    global modelTotal
    userTotal = sum([score['User'] for score in scores])
    modelTotal = sum([score['Model'] for score in scores])
    userPercent = userTotal/counts
    modelPercent = modelTotal/counts
    

    return (userTotal, modelTotal,userPercent,modelPercent)






@app.route('/clear_session', methods=['POST'])
def clear_session():
    session.clear()

    global scores
    global userTotal
    global modelTotal
    global counts
    counts = 0
    scores = []
    userTotal =[]
    modelTotal = []
    
    return jsonify({'status': 'data cleared'})




if __name__ == '__main__':
    app.run(debug=True)



