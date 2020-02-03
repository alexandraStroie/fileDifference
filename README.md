# fileDifference
README

Application File Difference -  compares the different versions of documents:
http://www.developsense.com/exercises/fd/filediffer.html

Testing framework: Cypress


PREREQUESITES and INSTALLATION:

Install Cypress 3.8.3, can be found at:  https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements

For the retries function to work, please install plugin: npm install -D cypress-plugin-retries
For uploading files, install cypress-file-upload library: npm install --save-dev cypress-file-upload

OPEN and RUN test cases
https://docs.cypress.io/guides/getting-started/installing-cypress.html#Opening-Cypress


CMD go to folder cd.. and run: npx cypress open 
open cypress with: npx cypress open     
(note: npx is included with npm > v5.2 or can be installed separately.)

OR run tests directly from cmd with: npm test

------------------------------------------------------------------------------------------------------------

Specs that fail: 
test4_docFiles.spec.js  -  cannot open .doc files (message File not supported! appears and fails test)
test5_pdfFiles.spec.js  -  cannot open .pdf files (message File not supported! appears and fails test)

and, for test2_SameTxtFile.spec.js, test2, from context 1 was made to fail (Compare txt file with blank display area), when it compares a text to a blank area, no difference appears, and no message


Documentation:
cypress upload files: https://www.npmjs.com/package/cypress-file-upload

mime type for uploading files using cypress: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types


Project organization:

elements folder -> contains a elements_json.json file with the selectors used in testing the app
function folder -> contains a functions.js file with functions that are called in tests (ex: functions for pressing buttons etc)
general_commands -> contains a general_commands.js file with commands used in tests (ex: uploadFiles, compareText)
parameters -> contains a testParameters.json file with parameters used in tests (ex: textFileName, path etc)
documents -> contains the documents used in testing (ex .txt files, .doc etc)
integration -> file_diff_test -> contains .spec.js files - the test cases for the application 


Test files:
test1_DifferentTxtFiles.spec: contains one test (one "it"):
Compare two different txt files of small sizes that contain only one difference (hello world text)
	uploads files
	checks if the files names appear next to choose button
	checks if the "File not supported!" message appears - if yes fails test
	compares dislpay areas text with the content of the files uploaded
	compare the two display areas
	check difference elements (Difference Base Text and New Text)
	press reset buttons and check if the display areas are empty
	

The following specs files follows aprox. all the steps found in test1_DifferentTxtFiles.spec.js

test2_SameTxtFile.spec.js: contains 6 test cases (one describe, 2 contexts and 6 "it")

	Describe: Upload and compare txt files of different sizes: itself/blank/typed characters
		 Context1: Small size txt files - less then 20 words
			test1: Upload and compare a txt file with itself
			test2: Compare txt file with blank display area   - !! this test is made to fail because when it compares a text to a blank display area, no difference are shown
			test3: Compare a txt file with typed characters in the display area
		
		 Context2: Bigger size txt files - more then 100 words
			test1: Upload and compare the same txt file
			test2: Upload and compare two different txt files
			test3: Compare a txt file with typed chars on second display area
			

test3_TypedChars.spec.js: contains 4 test cases (one describe, 4 "it")
	Describe: Type characters in the display areas and compare them
		test1: Type the same characters in the display areas and compare them
		test2: Type different characters in the display areas and compare them
		test3: Type the same non alphanumeric characters in the display areas and compare them 
		test4: Type non alphanumeric characters in one display area and normal text in second display area and compare them
		


.pdf and .doc is not supporting, but I created the test cases:		

test4_docFiles.spec.js:
	Describe: Upload and compare .doc files
		test1: Compapre two different doc files of small sizes
		test2: Upload the same doc file for both display areas
		
		
test5_pdfFiles.spec.js
	Describe: Upload and compare .pdf files
		test1: Compapre two different pdf files of small sizes
		test2: Upload the same pdf file for both display areas




Bugs
1.Files with format .doc are not supported: message "File not supported!" appears when uploading a .doc file
Expected behavior: Files with format .doc files should be supported

2.Files with format .pdf are not supported: message "File not supported!" appears when uploading a .pdf file
Expected behavior: Files with format .pdf files should be supported

3. "Reset" button for display area 1, overlaps the "Difference" button
Expected behavior: Reset button1 should be position symetrically from reset button 2

4. Option "show only difference" is not working properly. 
When checked it only hides the empty sapces (marked with gray), and leavs the red lines from delete).
Expected behavior: When option "show only difference" is checked: in the difference table, only the yellow diffrence lines should appear

5. Display area with text compared to blank 
When a display area with text is compared to blank, no difference is shown
Expected behavior: The differnce column shoul appear  OR a message



Other test cases can be: 
1.Upload other file format then the ones supported

2.Upload images and see if it breaks

3.Upload docs with images and links

4.Upload pdfs with images and links

5.Upload mp3 files (the result should be: File not supported)

6.Type in text, delete/insert and compare

7.Upload a txt file (and other formats), then upload in the same area other files, and check if in the display area is only the second file











