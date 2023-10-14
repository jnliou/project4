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

### Data Integration and Export

The results of the various analyses were integrated into 4 DataFrames. 2 for the training data: ```Dataset/eda_train_infect.csv```, ```Dataset/eda_train_uninfect.csv```, and two for the testing data: ```Dataset/eda_test_infect.csv```, ```Dataset/eda_test_uninfect.csv``` for further analysis and reference.

**Data Transformation**
After cleaning, we transformed the data to make it suitable for our analysis and Machine Learning purposes. This involved the following:
WRITE HERE 

**Data Integration**
Once we had consistent structures of data, we integrated it into a single DataFrame using SQLite.

**Step 6: Data Export**

## Data Science
## FLASK
### Key Libraries Used:

| Type | Library|
|-----:|---------------|
| Data Handling & Processing|   Numpy, Pandas |
| Web Framework |  Flask  |
| Storage & AWS Interaction|  Boto3   |
|  File Handling & Compression|  Zipfile, IO   |
| Randomization| Random  |
|  Database & ORM| SQLAlchemy, csv  |

### Backend Processes & AWS Integration:
* To interact with our AWS storage, we generated pre-signed URLs from our S3 bucket name and key. This provides an API for Flask to retrieve image files.
 * The essential aws_access_key is fetched from our config file, ensuring its security by not sharing it on GitHub.
### User Interaction & Data Handling:
* Flask plays a pivotal role in capturing user input data from our web game, which is temporarily stored in a global variable.
* After processing this data through our game logic, Jinja2 templating assists in parsing the variables to the frontend, making it accessible for various functions.
### API Creation:
* With the combination of SQLAlchemy and Flask, we've set up API routes that output data in JSON format.
  
**These intricacies, woven together, create a robust and interactive platform tailored to our users' needs.**

* Codes found here for helping to run Flask: [helper.py](helper.py)
* To run Flask: [app.py](app.py)
* SQLite Database: [WRITEHERE.db](project3.db)
* Queries on SQLite to create tables: [SQLite-query](sqlite-query)

## Front End Development for User Integration
Pluggin used includes plotly, bootstrap and google fonts.

### Front-end: 
* HTML and CSS have been employed to design the visuals and effects. For user interactions, including an engaging game to showcase our machine learning model, we've used JavaScript.
### Visualization: 
* Plotly was instrumental in creating graphical representations like pie charts.
### Styling & Fonts: 
* Bootstrap and Google Fonts enhanced the website's aesthetics and readability.
### Backend & Storage:
* With Flask serving as our backend framework, we're efficiently reading data from our database.
* AWS S3 has been our choice for storage. It allows us to select image names from the database and subsequently extract and display the relevant image files on the website.
### User Interaction: 
* Users can select infected cells on the platform. Once they submit their selections, the data is sent to our backend for processing.
**By seamlessly integrating these tools, we've been able to craft a dynamic and interactive platform for our users.**

##### Presentation

