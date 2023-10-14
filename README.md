# Machine Learning Modelling on Malaria Cell Image Recognition
![!\[science\](https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1g)](Dataset/science.jpg)

The primary aim of the project is to analyze cell image data of subjects that have malaria and subjects that do not have malaria and apply machine learning principles which will allow the machine to predict whether or not a subject has malaria. This can assist healthcare practitioners on easier metrics in terms of diagnosis, as well as the general public. This can allow the general public to possibly seek out further medical assistance if they believe they may have malaria.

## Our team:
* [Julia Liou](https://github.com/jnliou) 
* [Kevin Wan](https://github.com/zRandgris) 
* [Manpreet Sharma](https://github.com/mehpree)
* [Srinivas Jayaram](https://github.com/srinivasj1987) 

## Programs Utilized:

### Backend 
* Python: pil, os, CV2
* Flask
* SQLite

### Frontend
 
### Other
* GitHub

## Dataset used:
* [Kaggle Dataset on Malaria](https://www.kaggle.com/datasets/iarunava/cell-images-for-detecting-malaria) 
* [Originally from National Library of Medicine](https://lhncbc.nlm.nih.gov/LHC-downloads/downloads.html#malaria-datasets)

## To run the app:

* Git clone- https://github.com/jnliou/project4.git 
* cd into directory- project4 
* Start Flask app with [app.py](app.py)
* Run [index.html](index.html) to view the dashboard in a browser

![Data Pipeline](<Dataset/Project Timeline Builder - Frame 1.jpg>)

## Project Management:

* [Project Management](https://trello.com/b/ZZba331m/project-4) 
* [Diagram](https://miro.com/app/board/uXjVMgjTsg0=/?share_link_id=996896602000)

## Data Cleaning and Exploratory Data Analysis

### Data Preprocessing 
* [Kaggle Dataset on Malaria](https://www.kaggle.com/datasets/iarunava/cell-images-for-detecting-malaria) 
* [Jupyter Notebook Code for Data Preprocessing](<data_preprocess.ipynb>)

#### Instructions on how to run the code

- As the dataset was >100mb we were unable to upload it onto GitHub even after compressing the folder into a ZIP format.
- In order to access the original dataset, please download it from Kaggle: [Kaggle Dataset on Malaria](https://www.kaggle.com/datasets/iarunava/cell-images-for-detecting-malaria).
- Extract the folder into the ```Dataset``` folder.
- Run the code via [Jupyter Notebook Code for Data Preprocessing](<data_preprocess.ipynb>) 

#### Notes on the Data Cleaning/Preprocessing Process
* The original dataset contained 3 folders, one named ```cell_images\cell_images```, one named ```cell_images\Uninfected```, and one named ```cell_images\Parasitized```. As the ```cell_images\cell_images``` folder contained the same data as the Uninfected and Parasitized folders, this folder was deleted to assist with easier processing of the data. 
*  We then converted the photos into 25x25 pixels.
* Utilizing Jupyter Notebook and Python we selected 2500 photos from ```Dataset\cell_images\Parasitized``` and 2500 photos from ```Dataset\cell_images\Uninfected``` and added 1750 infected photos into ```cell_images\clean\train\infected_processed``` and   1750 uninfected photos to ```cell_images\clean\train\uninfected_processed``` for training data, and 750 infected photos into ```cell_images\clean\test\infected_processed``` and 750 uninfected photos into ```cell_images\clean\test\uninfected_processed``` for testing data. This cut down our photos from **27,558** to **5,000**. 

From ![Unprocessed image](<Dataset/EDA/infected cells-unprocess.png>) to ![processed image](<Dataset/EDA/infected cells-unprocess.png>).

## Exploratory Data Analysis

![EDA Header](<Dataset/EDA/EDA header.png>)

Tableau Dashboard of Exploratory Data Analysis: https://public.tableau.com/app/profile/julia.liou6123/viz/EDAonCellImagesofMalaria-Tableau/RGB 

### Cell Image Analysis

This repository contains an analysis of cell images comparing unprocessed vs. processed and uninfected vs. infected cells. Various image analysis techniques, including blob detection, edge detection, edge density, and RGB color channel distribution, were utilized to determine differences in characteristics or properties between the two.
![Infected](<Dataset/EDA/infected cells-process.png>)
![Uninfected](<Dataset/EDA/uninfected cells-process.png>)

### Blob Detection Analysis

### Mean Blob Size and Max Blob Size
![Blob Detection](Dataset/EDA/blobs.png)

Blob detection was performed to identify and analyze blobs within the images. For both uninfected and infected cells, the mean blob size and the maximum blob size were calculated. Statistical differences were assessed using histograms and T-tests.

### Edge Detection Analysis

Edge detection was employed to visualize the differences between uninfected and infected cells in terms of their edge structures. The resulting images provide a clear visual representation of the variations in edges.

![!\[Edge Detection\](Dataset/EDA/edgedetection.PNG)](Dataset/EDA/edgedetection.PNG)

### Edge Density Analysis

Edge density comparison between uninfected and infected cells was conducted. Histograms and T-tests were used to analyze the differences in edge density characteristics.

### Average RGB Color Analysis

The average RGB color distribution of each image for infected and uninfected cells was compared. Histograms and T-tests were used to evaluate any statistical distinctions in average RGB color distribution.

## Principal Component Analysis

We used two methods to perform PCA on our image dataset. 

- Approach1: Performing PCA over Image Characteristics and Features as mentioned below. Results are displayed as below. 
    - RGB Channel Distribution
    - Max/Mean Blob 
    - Edge Density of the image
 
![image](https://github.com/jnliou/project4/assets/131678606/7ff39e06-b82b-4ad6-9d49-fb3d832814f1)
![image](https://github.com/jnliou/project4/assets/131678606/8aac7a58-e539-42db-ab75-8a40d93f89b1)
![image](https://github.com/jnliou/project4/assets/131678606/b81c6f47-2625-448e-a49d-017f564675ec)


- Approach2: We performed PCA on our raw image dataset by following the steps below to see if there is a split between class labels.
    - Read images
    - Flatten images
    - Process in PCA
    - Plot on 2d map, color by class label
![image](https://github.com/jnliou/project4/assets/131678606/c532a95e-964c-4f09-a0ce-d4496986d727)
![image](https://github.com/jnliou/project4/assets/131678606/3ee47546-9b9a-40db-b6db-4e4e44f9b81e)

### Data Integration and Export

The results of the various analyses were integrated into 4 DataFrames. 2 for the training data: ```Dataset/eda_train_infect.csv```, ```Dataset/eda_train_uninfect.csv```, and two for the testing data: ```Dataset/eda_test_infect.csv```, ```Dataset/eda_test_uninfect.csv``` for further analysis and reference.

**Data Transformation**
After cleaning, we transformed the data to make it suitable for our analysis and Machine Learning purposes. This involved the following:
WRITE HERE 

**Data Integration**
Once we had consistent structures of data, we integrated it into a single DataFrame using SQLite.

**Step 6: Data Export**
Data was exported to our website using a sqlite database which consisted of the predictions from our ML model, while our raw data (image dataset) was hosted on S3 bucket. 

**Step 7: Building the Machine Learning**
We tried a few different machine learning models to figure out the best accuracy for our end goal. 

A) CNN:

B) Random Forest:

c) SVC:

D) Ensemble:

E) Linear Regression:

F) Decision Tree:

G) KNN:

D) Xception: 
This is a pre-trained model on the popular image dataset called `imagenet`. 
- We built our base model using the pre-trained model and then added a layer of our own testing and training dataset to see how it will perform. 
- We got an accuracy of 79%, over 20 epochs.
- It was interesting to notice that the only way to fine-tune this model was to introduce our original dataset into one of the layers.
- Different Convo2D layers did not sit cohesively with the machine learning model.

The graphs below depict that the data was overfitting at certain points.

![image](https://github.com/jnliou/project4/assets/131678606/8011ae48-a516-4752-b0aa-6727f4fb267f)
![image](https://github.com/jnliou/project4/assets/131678606/eaa75a2e-0443-441d-8f7e-2cd2ae798ccf)

## FLASK 

We utilized SQLAlchemy and Flask to create API routes in JSON format for 

* Codes found here for helping to run Flask: [helper.py](helper.py)
* To run Flask: [app.py](app.py)
* SQLite Database: [WRITEHERE.db](project3.db)
* Queries on SQLite to create tables: [SQLite-query](sqlite-query)

## Data Science

## Front End Development for User Integration


##### Presentation

