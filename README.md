# openalex-explore

## Overview

[comment]: # (Give a brief overview of your module here. For example: this module is responsible for classifying pieces of text using a neural network on top of BERT.) 

[comment]: # (Note: if this is a second or latter iteration of a module, you may reuse the old iteration's README as a starting point, but you should still update it.)

This module is responsible for providing a website for users to better explore the OpenAlex Dataset

 

## Setup

<!---

List the steps needed to install your module's dependencies: 

1. Include what version of Python (e.g. 3.8.12) and what version of pip (e.g. 21.3.1) you used when running your module. If you do not specify these, other users may run into several problems when trying to install dependencies!

2. Include a requirements.txt containing all of the python dependencies needed at your project's root (see this [link](https://stackoverflow.com/questions/31684375/automatically-create-requirements-txt) for instructions on how to create a requirements.txt). If you used a python virtual environment, use `pip freeze -l > requirements.txt` to generate your requirements.txt file. Make sure to include the below line somewhere in this section to tell users how to use your requirements.txt. 
```
pip install -r requirements.txt 
```

3. Additionally, list any other setup required to run your module such as installing MySQL or downloading data files that you module relies on. 

4. Include instructions on how to run any tests you have written to verify your module is working properly. 

It is very important to also include an overall breakdown of your repo's file structure. Let people know what is in each directory and where to look if they need something specific. This will also let users know how your repo needs to structured so that your module can work properly

```
firstname-lastname-repo-name/
    - requirements.txt
    - data/ 
        -- eval_articles.csv
        -- train_articles.csv
        -- Keywords_Springer.csv
    - trained_models/
        -- best.model
    - src/
        -- create_train_data/
            --- query_google.py 
            --- extract_from_url.py
        -- train.py
        -- classify_articles/
            --- main.py
            --- utils.py
   - tests/
       -- data_preprocess_test.py
       -- eval_pretrained_model_test.py
```

Include text description of all the important files / componenets in your repo. 
* `src/create_train_data/`: fetches and pre-processes articles
* `src/train.py`: trains model from pre-processed data
* `src/classify_articles/`: runs trained model on input data
* `data/eval_artcles.csv`: articles to be classified (each row should include an 'id', and 'title'))

-->

### Dependencies
- Frontend

  Listed in `frontend/package.json`. 
   
  Please run `yarn install` in `frontend/` to install all dependencies.
   
- Backend

  Listed in `backend/package.json`.
  
  Please run `npm install` in `backend/` to install all dependencies.
  
  

### Additional Setup
1. Follow the steps on [OpenAlex's website](https://docs.openalex.org/download-snapshot/upload-to-your-database/load-to-a-relational-database) to download the snapshot and upload the dataset into a PostgreSQL database
2. Update the database info in `backend/connection.js` to connect the backend to your PostgreSQL database
3. The backend of this module utilizes [PostgreSQL's full text search](https://www.postgresql.org) for authors and works. Run the following queries in order after you have finished setting up the database.

	```sql
	--author
	ALTER TABLE openalex.authors 
	ADD COLUMN english_ts_name tsvector 
	GENERATED ALWAYS AS (to_tsvector('english', display_name)) STORED;

	CREATE INDEX author_ts_idx ON openalex.authors USING GIN (english_ts_name);

	--work
	ALTER TABLE openalex.works 
	ADD COLUMN english_ts tsvector 
	GENERATED ALWAYS AS (to_tsvector('english', display_name)) STORED;

	CREATE INDEX work_ts_idx ON se_details USING GIN (english_ts);
	```

### Running the app
- To start the backend API server, go to `backend/` and run `node index.js`
- To start the frontend, go to `frontend/` and run `yarn start`
- Note: it is recommended to start the backend API server first

<!---
### Important 
Go to [our shared google Drive space](https://drive.google.com/drive/folders/1rxPAdGTVcl-Xo6uuFovdKcCw5_FEaXIC?usp=sharing) and create a folder with the format `FirstnameLastName-Projectname` (e.g. `AshutoshUkey-KeywordTrie`). In here, make sure to include a zipped copy of any data files related to your module (including `.sql` dumps of necessary databases) as well as a backup zipped copy of your Github repo (i.e. all the files you upload to Github).
-->


## Functional Design (Usage)

<!---

Describe all functions / classes that will be available to users of your module. This section should be oriented towards users who want to _apply_ your module! This means that you should **not** include internal functions that won't be useful to the user in this section. You can think of this section as a documentation for the functions of your package. Be sure to also include a short description of what task each function is responsible for if it is not apparent. You only need to provide the outline of what your function will input and output. You do not need to write the pseudo code of the body of the functions. 

* Takes as input a list of strings, each representing a document and outputs confidence scores for each possible class / field in a dictionary
```python
    def classify_docs(docs: list[str]):
        ... 
        return [
            { 'cs': cs_score, 'math': math_score, ..., 'chemistry': chemistry_score },
            ...
        ]
```

* Outputs the weights as a numpy array of shape `(num_classes, num_features)` of the trained neural network 
```python
    def get_nn_weights():
        ...
        return W
```
-->
### Basic capabilities:
1. Support search and filter/sort for all five entities
   - For concepts, support search by display_name and description. Support filtering/sorting search results by updated date, works count, cited by count, and level.
   - For works, support search by doi and title (display_name). Support filtering/sorting search results by publication date (year), type, cited by count, is_retracted, is_paratext.
   - For authors, support search by name and alternative_name. Support filtering/sorting search results by works count, cited by count, and last known institution.
   - For venues, support search by ISSN and display_name. Support filtering/sorting search results by works count, cited by count, is_oa, is_in_doaj,  and publisher.
   - For institutions, support search by ror and display_name. Support filtering/sorting search results by type, works count, cited by count, and location (country, region, city).

2. Display detail for each entity
    - For concepts, display name, description, link to wikipedia (1044/65073 concepts don’t have a wikipedia link), works count, cited by count, image (29318/65073 concepts don’t have an image), ancestors, updated date, and related concepts.
    - For works, display title, publication date, type, cited by count, author, host venue (including volume, issue, pages, etc.), alternate host venues, concepts, related works, and referenced works.
    - For authors, display name, name_alternatives, works count, cited by count, last known institution, twitter (only available for 346 authors), wikipedia (only available for 377 authors)
    - For venues, display name, ISSN, publisher, works count, cited by count, is_oa, is_in_doaj, homepage_url (only available for 6426/124066 venue)
    - For institutions, display ror, location, type, homepage url (2810/108660 institution missing homepage url), image (only available for 26545/108660 institutions), works count, cited by count, wikipedia (available for 41691/108660 institutions), and associated institutions.

### Advanced capabilities:
1. Recommendations based on entity relationships
    - For concepts, recommend top works (sorted by cited by count), top authors (authors whose works related to this concept have the most cited by count in total), top institutions (institutions that produce most works related to this concept), and top venues (venues that produce most works related to this concept)
    - For works, recommend top works with the same concept, and top works produced by the same author.
    - For authors, recommend top works (sorted by cited count), show primary research topics/concepts (concepts that the author produced most works about), and similar authors (authors with the same primary search topics/concepts)
    - For venues, recommend top works (sorted by cited count), and top authors (authors that publish the most works on this venue).
    - For institutions, recommend top researchers/authors (authors that produce the most works), top concepts (concepts related to works that have the most total cited by count)

2. Entity statistics
    - For concepts, show a line graph based on works count in each year, and a line graph based on cited by count in each year. (both data can be retrieved from the concepts_counts_by_year table) 
    - For authors, show a line graph based on works count in each year, a line graph based on cited by count in each year (both data can be retrieved from the authors_counts_by_year table), and a line graph based on top research concept/interest in each year (group work by published years and then get the concepts that have most total works count)
    - For venues,  show a line graph based on works count in each year, and a line graph based on cited by count in each year (both data can be retrieved from the venues_counts_by_year table)
    - For institutions, show a line graph based on works count in each year, a line graph based on cited by count in each year (both data can be retrieved from the institutions_counts_by_year table), and a line graph based on top research concept/interest in each year (group work by published years and then get the concepts that have most total works count)

3. Recommendations based on recent trends
    - For concepts, authors, and venues, recommend items that gained the largest cited by count/works count increase in the last year

## Demo video
<!---
Make sure to include a video showing your module in action and how to use it in this section. Github Pages doesn't support this so I am unable to do this here. However, this can be done in your README.md files of your own repo. Follow instructions [here](https://stackoverflow.com/questions/4279611/how-to-embed-a-video-into-github-readme-md) of the accepted answer 
-->


[![Watch the video](https://user-images.githubusercontent.com/89936983/186773984-50d5e943-7116-42ad-85c4-78475776df57.png)
](https://drive.google.com/file/d/18eu4_kkP-u7Zh96L23YXgYX5voRoYQqZ/view?usp=sharing)

## Algorithmic Design 
<!---
This section should contain a detailed description of all different components and models that you will be using to achieve your task as well as a diagram. Here is a very basic example of what you should include:

We generate vector representations for each document using BERT, we then train a simple, single-layer fully connected neural network using the documents and labels from the training set.

First, we select a set of labeled text documents `d_1, d_2, …, d_N` from the arxiv dataset available on Kaggle. The documents are randomly partitioned into two sets for training and testing. We use the BERT language model's output as the input to the neural network. Only the weights of the neural network are modified during training. 

After training, we run the trained model to classify the test documents into one of the classes in C. Below is a picture of the architecture of the module. The diagram below was constructed using draw.io 


![design architecture](https://github.com/Forward-UIUC-2021F/guidelines/blob/main/template_diagrams/sample-design.png)
-->

### Language & frameworks:
- Backend 
  Language: javascript
  
	 Frameworks: `express` (api server), `pg` (connection to postgres database) 
- Frontend
  Language: javascript
  
	 Frameworks: `react` (ui), `axios` (api calls), `chart.js` (for visualizing entity stats)

### Block diagram:
![https://github.com/Forward-UIUC-2022M/xinshuo-lei-openalex-explore/main/block-diagram.png](https://github.com/Forward-UIUC-2022M/xinshuo-lei-openalex-explore/blob/54d2f48a9666d621124ad486d37a5cdeb600eb73/block-diagram.png)
 
### Files, functions, and algorithms:
- Database connection module:

  - `connection.js`
    - connect to the database with pg
    - functions: 
  
       ``` 
       runQuery(query):
         takes a query
         runs it with pg
         returns the query result
       ```
- Modules for calculating and retrieving data

  There are 5 files in total, one for each entity. 
  - `concept_model.js`

    - functions:
    
      ```
      searchConcepts(field, key):
        takes search field (display_name, description, etc.) and key
        formats a query that searches the database with the given keyword
        runs the query with  runQuery function in connection.js and returns the result

      getConceptById(id):
        takes a concept id
        formats a select query that retrieves all necessary info for the specific concept
        runs the query with  runQuery function in connection.js and returns the result

      getTopWorks(id):
        takes a concept id
        formats a select query that retrieves all works in the specific concept 
        (by joining works, works_concepts, concepts tables), 
        sorts the works by cited by count, and returns the top 10 results
        runs the query with  runQuery function in connection.js and returns the result
         
      getTopAuthors(id):
        takes a concept id
        formats a select query that retrieves all works in the specific concept 
        (by joining works, works_concepts, works_authroships, authors tables), 
        group by author_id, sorts the authors by total cited by count, 
        and returns the top 10 results
        runs the query with  runQuery function in connection.js and returns the result
         
      getTopInstitutions(id):
        takes a concept id
        formats a select query that retrieves all works in the specific concept 
        (by joining works, works_concepts, works_concepts, works_authroships, institutions tables), 
        group by institution_id, sorts the institutions by total cited by count, 
        and returns the top 10 results
        runs the query with  runQuery function in connection.js and returns the result

      getTopVenues(id):
        takes a concept id
        formats a select query that retrieves all works in the specific concept 
        (by joining works, works_concepts, venues tables), 
        group by venues_id, sorts the venues by total cited by count, 
        and returns the top 10 results
        runs the query with  runQuery function in connection.js and returns the result
         
      getStats(id):
        takes a concept id
        formats a query that retrieves work count by year 
        (from concepts_count_by_year table)
        runs the query with  runQuery function in connection.js
        format the query result for line graphs
      
      getTrendingRecommendation():
        format a query that group concepts_count_by_year by concept_id
        runs the query with  runQuery function in connection.js
        loop through each concept, calculate the increase in works count in the last year
        sort the concepts by the increase in works count and return top 10 results
       ```
       
  - `work_model.js`
  
    - functions

        ```
        searchWork(field, key):
          takes search field (display_name, description, etc.) and key
          formats a query that searches the database with the given keyword 
          runs the query with  runQuery function in connection.js and returns the result
         
        getInfoById(id):
          takes a work id
          formats a select query that retrieves all necessary info for the specific work
          runs the query with  runQuery function in connection.js and returns the result
         
        getTopWorksInSameConcept(id):
          takes a work id
          formats a select query that retrieves all works with the same concept 
          (by joining works, works_concepts tables), 
          sorts the works by cited by count, and returns the top 10 results
          runs the query with  runQuery function in connection.js and returns the result
         
        getTopWorksBySameAuthor(id):
          takes a work id
          formats a select query that retrieves all works by the same author 
          (by joining works, works_authroships tables), 
          sorts the works by total cited by count, and returns the top 10 results
          runs the query with  runQuery function in connection.js and returns the result
         ```
  - `author_model.js`
  
    - functions
    
        ```
        searchAuthor(field, key):
          takes search field (display_name, description, etc.) and key
          formats a query that searches the database with the given keyword and filters
          runs the query with  runQuery function in connection.js and returns the result
          
        getInfoById(id):
          takes an author id
          formats a select query that retrieves all necessary info for the specific author
          runs the query with  runQuery function in connection.js and returns the result
          
        getTopWorks(id):
          takes an author id
          formats a select query that retrieves all works by the author 
          (by joining works, works_authorships, authors table), 
          sorts the works by cited by count, and returns the top 10 results
          runs the query with  runQuery function in connection.js and returns the result
          
        getTopConcepts(id):
          Part of advanced capabilities #1: recommendation based on entity relationships
          takes an author id
          formats a select query that retrieves all concepts that the author produced works about 
          (by joining works, works_concepts, authors, works_authroships, authors tables), 
          group by concept_id, sorts the concepts by work count and returns the top 10 results
          runs the query with  runQuery function in connection.js and returns the result
          
        getStats(id):
          takes an author id
          formats a query that retrieves work count by year (from authors_count_by_year table)
          runs the query with  runQuery function in connection.js
          format the query result for line graphs
          
        getTrendingRecommendation():
          format a query that group authors_count_by_year by concept_id
          runs the query with  runQuery function in connection.js
          loop through each author, calculate the increase in works count in the last year
          sort the authors by the increase in works count and return top 10 results
        ```
        
        
  - `venue_model.js`
  
    - functions
    
        ```
        searchVenues(field, key):
          takes search field (display_name, description, etc.) and key
          formats a query that searches the database with the given keyword and filters
          runs the query with  runQuery function in connection.js and returns the result
          
        getInfoById(id):
          takes a venue id
          formats a select query that retrieves all necessary info for the specific venue
          runs the query with  runQuery function in connection.js and returns the result
          
        getTopWorks(id):
          takes a venue id
          formats a select query that retrieves all works in the venue 
          (by joining works, venues table), 
          sorts the works by cited by count, and returns the top 10 results
          runs the query with  runQuery function in connection.js and returns the result
          
        getTopAuthors(id):
          takes a venue id
          formats a select query that retrieves all authors that published works on this venue 
          (by joining works, works_authroships, authors, venues tables),
          group by author_id, sorts the authors by count of works published on the venue, 
          and returns the top 10 results
          runs the query with  runQuery function in connection.js and returns the result
          
        getStats(id):
          takes an author id
          formats a query that retrieves work count by year (from venues_count_by_year table)
          runs the query with  runQuery function in connection.js
          format the query result for line graphs
          
        getTrendingRecommendation():
          format a query that group venues_count_by_year by concept_id
          runs the query with  runQuery function in connection.js
          loop through each venues, calculate the increase in works count in the last year
          sort the venues by the increase in works count and return top 10 results
        ```
        
  - `institution_model.js`
  
    - functions
    
        ```
        search(field, key):
          takes search field (display_name, description, etc.) and key
          formats a query that searches the database with the given keyword and filters
          runs the query with  runQuery function in connection.js and returns the result
          
        getInfoById(id):
          takes an institution id
          formats a select query that retrieves all necessary info for the specific institution
          runs the query with  runQuery function in connection.js and returns the result
          
        getTopAuthors(id):
          takes an institution id
          formats a select query that retrieves all authors in the institution 
          (by joining authors, institutions table),
          sorts the authors by works count, and returns the top 10 results
          runs the query with  runQuery function in connection.js and returns the result
          
        getTopConcepts(id):
          takes an institution id
          formats a select query that retrieves all concepts related to works produced 
          by authors in this institution
          (by joining works, works_authroships, authors, works_concepts, concepts, institution tables),
          group by concept_id, sorts the concepts by total cited count, and returns the top 10 results
          runs the query with  runQuery function in connection.js and returns the result
          
        getStats(id):
          takes an institution id
          formats a query that retrieves work count by year (from institutions_count_by_year table)
          runs the query with  runQuery function in connection.js
          format the query result for line graphs
        ```

- Express API server
  - `server.js`
  
    ```
    start the api server
    set up endpoints
    call the corresponding function in each endpoint
    wrap the result from functions and send them in response
    ```



## Issues and Future Work

<!--- In this section, please list all know issues, limitations, and possible areas for future improvement. For example:

* High false negative rate for document classier. 
* Over 10 min run time for one page text.
* Replace linear text search with a more efficient text indexing library (such as whoosh)
* Include an extra label of "no class" if all confidence scores low. 

-->
* Slow loading speed due to joining 5-6 tables in some query
* Move filtering result from frontend to backend
* cache some results that doesn't change (such as trending recommendation)

## Change log
<!---
Use this section to list the _major_ changes made to the module if this is not the first iteration of the module. Include an entry for each semester and name of person working on the module. For example 

Fall 2021 (Student 1)
* Week of 04/11/2022: added two new functions responsible for ...
* Week of 03/14/2022: fixed bug and added support for ...

Spring 2021 (Student 2)
...

Fall 2020 (Student 3)
...
-->

## References 
<!--- include links related to datasets and papers describing any of the methodologies models you used. E.g. 

* Dataset: https://www.kaggle.com/Cornell-University/arxiv 
* BERT paper: Jacob Devlin, Ming-Wei Chang, Kenton Lee, & Kristina Toutanova. (2019). BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding.
Include a brief summary of your module here. For example: this module is responsible for classifying pieces of text using a neural network on top of BERT. 

Note: if this is a second or latter iteration of a module, you may reuse the old iteration's README as a starting point (you should still update it). 
-->
* Dataset: [https://www.kaggle.com/Cornell-University/arxiv ](https://openalex.org)
