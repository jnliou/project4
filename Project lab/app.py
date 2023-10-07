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



app = Flask(__name__)
app.secret_key = 'monkey55@2023'

#S3 API keys
s3 = boto3.client('s3',
                  aws_access_key_id= key_id,
                  aws_secret_access_key= key)

#Setting up some variables
#model_key = 'model_keras.h5'
bucket_name = 'p4dreambucket'
path = 'imagefile/Combine/'
csv_path = 'Data/combined.csv'


def load_csv_to_dataframe(csv_path):
    return pd.read_csv(csv_path)


df = load_csv_to_dataframe(csv_path)


# Function for getting the column 'target'
def get_target_from_csv(df, filename, image_column="ImageFileName", value_column="target"):
    # Find the row where the image filename matches
    matched_row = df[df[image_column] == filename]
    
    # If a match is found, return the corresponding value from the desired column
    if not matched_row.empty:
        return matched_row[value_column].values[0]
    else:
        return None

# Function for getting the column CNN
def get_prediction_from_csv(df, filename, image_column="ImageFileName", value_column="CNN_predictions"):
    # Find the row where the image filename matches
    matched_row = df[df[image_column] == filename]
    
    # If a match is found, return the corresponding value from the desired column
    if not matched_row.empty:
        return matched_row[value_column].values[0]
    else:
        return None









# App main here ---------------------------
@app.route('/')
def display_images():
    s3_bucket_name = 'p4dreambucket'

    ##This line is for reading directly from S3
    #object_list = list_objects_in_bucket(s3_bucket_name)

    # List all images in the csv bucket
    all_image_names = get_image_names_from_csv('Data/combined.csv')
    # Randomly select 5 objects (images) from the list
    selected_image_names = random.sample(all_image_names, 5)
    
    #Here will be code to extract target value from csv
    target_list_csv = []
    for image_filename in selected_image_names:
        value = get_target_from_csv(df, image_filename)  # getting value from target column
        print(f' The VALUE IS: {value}')
        target_list_csv.append(value)
    
    
    #session['target_list_csv'] = target_list_csv
    #Here will be code to extract CNN value from csv
    prediction_list_csv = []  
    for image_filename in selected_image_names:
        value = get_prediction_from_csv(df, image_filename)  # getting value from CNN
        print(f' The VALUE IS: {value}')
        prediction_list_csv.append(value)            
  


    answer = filter_answer(target_list_csv)
    model_answer = filter_prediction(prediction_list_csv)
    print(f'The SELECTED 5 are:{selected_image_names}')
    print(f'The predictions are :{model_answer}') 
    print(f'The answers are :{answer}') 

    # Generate pre-signed URLs for the selected objects
    image_urls = generate_presigned_urls(s3_bucket_name, selected_image_names,path)
    zipped_data = zip_function(image_urls, model_answer)
    
    return render_template('image.html',zipped_data = zipped_data)



def zip_function(x,y):
    # ... other code ...

    # Zip your lists
    zipped_data = zip(x, y)
    
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
            filtered_prediction.append('Prediction: Infected')
            print(f'Yes')
        else:
            filtered_prediction.append('Prediction: Not-Infected')    
            print(f'No')
    print(f'This is the filtered objects {filtered_prediction}')
    return  filtered_prediction


#This is the fuction if i want to extract images directly from S3  
# def list_objects_in_bucket(bucket_name):
#     try:
#         # List all objects in the S3 bucket
#         response = s3.list_objects_v2(Bucket=bucket_name, Prefix='imagefile/Combine/')
#         object_list = [obj['Key'] for obj in response.get('Contents', [])]
#         print(f'Object list contains:{object_list}')
#         return object_list
#     except Exception as e:
#         print(f"Error listing objects in S3 bucket: {str(e)}")
#         return []

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


scores = []
@app.route('/submit_choices', methods=['POST'])
def submit_choices():
    user_choices = request.json['choices']
    correct_categories = session.get('target_list_csv', [])
    correct_count = sum(1 for choice in user_choices if choice in correct_categories)
    
    scores.append(correct_count)  # Add the score to the scores list
    
    return jsonify({'correct_count': correct_count, 'scores': scores})



if __name__ == '__main__':
    app.run(debug=True)




# @app.route('/')
# def display_image():
#     # Specify your S3 bucket name and image key (path).
#     bucket_name = 'p4dreambucket'
#     image_key = 'cat.1.jpg'
        
#     # Generate a pre-signed URL for the image.
#     url = s3.generate_presigned_url('get_object',
#                                     Params={'Bucket': bucket_name, 'Key': image_key},
#                                     ExpiresIn=3600)  # URL expiration time in seconds

#     return render_template('image.html', image_url=url)



# if __name__ == '__main__':
#     app.run(debug=True)
