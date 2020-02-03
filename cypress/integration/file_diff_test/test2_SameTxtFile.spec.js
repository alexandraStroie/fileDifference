/// <reference types="Cypress" />
import 'cypress-file-upload';
import '../../general_commands/commands'
import mainPage from '../../functions/functions'
import {navigateToApp} from '../../navigations/navigations'
import testParameters from '../../parameters/testParameters.json'
import elements from '../../elements/elements_json'

Cypress.env('RETRIES', testParameters.nrOfRetries)

const fileName1 = testParameters.txtFilename1 
const fileName2 = testParameters.txtFilename3 
const fileName3 = testParameters.txtFilename6 
const filePath1 = testParameters.pathTxtFile1 // 10 words fie
const filePath2 = testParameters.pathTxtFile3 // large size file
const filePath3 = testParameters.pathTxtFile6 
// const filePath3 = testParameters.pathTxtFile5  // non alphanumeric chars
const filePath_NonAlfaNumChars = testParameters.pathTxtFile5
const filePath4 = testParameters.pathTxtFile6  // large size file
const fileType_mimeType = 'text/txt';

describe('Upload and compare txt files of different sizes: itself/blank/typed characters', () => {

    beforeEach(() => {
        navigateToApp();
    })
    context('Small size txt files - less then 20 words', () => {

        it('Upload and compare a txt file with itself', () => {

            cy.uploadFiles(fileName1, fileType_mimeType, elements.fileUploadBtn1)
            cy.uploadFiles(fileName1, fileType_mimeType, elements.fileUploadBtn2)

            // check if the name of the file uploaded appears next to "choose button"
            cy.checkUploadedFile(elements.fileUploadBtn1,fileName1)
            cy.checkUploadedFile(elements.fileUploadBtn2,fileName1)

            // check if the message 'File not supported!' appears in the display area
            cy.getTextValueDisplayArea(elements.displayArea1).should('not.eq',testParameters.errorMessage)
            cy.getTextValueDisplayArea(elements.displayArea2).should('not.eq',testParameters.errorMessage)

            mainPage.pressOnDifferenceBtn(elements.differenceBtn)

            // check footer elements for diff info - they should not exist
            cy.get(elements.diffInfo).should('not.be.visible')
        
            // compare dislpay areas text with the content of the file uploaded - they should be eq
            cy.compareFileTextToDisplayTest(filePath1, elements.displayArea1)
            cy.compareFileTextToDisplayTest(filePath1, elements.displayArea2)

            // compare the two display areas - they should be equal
            cy.compareText(elements.displayArea1, elements.displayArea2)


            // press reset buttons and check if the display areas are empty
            cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)
            
        })      



        it('Compare a txt file with blank display area', () => {

            cy.uploadFiles(fileName1, fileType_mimeType, elements.fileUploadBtn1)

            // check if the name of the file uploaded appears next to "choose button"
            cy.checkUploadedFile(elements.fileUploadBtn1,fileName1)
            cy.checkUploadedFile(elements.fileUploadBtn2,'')

            // check if the message 'File not supported!' appears in the display area
            cy.getTextValueDisplayArea(elements.displayArea1).should('not.eq',testParameters.errorMessage)
            cy.getTextValueDisplayArea(elements.displayArea2).should('not.eq',testParameters.errorMessage)

            // compare dislpay areas text with the content of the file uploaded - they should be eq
            cy.compareFileTextToDisplayTest(filePath1, elements.displayArea1)
            
            // compare the two display areas - they should NOT be equal
            cy.compareTextNotEqual(elements.displayArea1, elements.displayArea2)

            mainPage.pressOnDifferenceBtn(elements.differenceBtn)

            // check footer elements for diff info - they should be visible  // expecting to show difference between blank and text
            cy.get(elements.diffInfo).should('be.visible')


            // press reset buttons and check if the display areas are empty
            cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)

        })


            
        it('Compare a txt file with typed characters in the display area', () => {

            cy.uploadFiles(fileName1, fileType_mimeType, elements.fileUploadBtn1)

            // check if the name of the file uploaded appears next to "choose button"
            cy.checkUploadedFile(elements.fileUploadBtn1,fileName1)

            // check if the message 'File not supported!' appears in the display area
            cy.getTextValueDisplayArea(elements.displayArea1).should('not.eq',testParameters.errorMessage)
            cy.getTextValueDisplayArea(elements.displayArea2).should('not.eq',testParameters.errorMessage)

            // compare dislpay areas text with the content of the file uploaded - they should be eq
            cy.compareFileTextToDisplayTest(filePath1, elements.displayArea1)

            // write something in the display area 2
            cy.typeInDspAreaTextFromFile(filePath_NonAlfaNumChars, elements.displayArea2)

            // compare the two display areas - they should NOT be equal
            cy.compareTextNotEqual(elements.displayArea1, elements.displayArea2)

            mainPage.pressOnDifferenceBtn(elements.differenceBtn)

            // check footer elements for diff info - they should be visible
            cy.get(elements.diffInfo).should('be.visible')

            // check the number of differences found
            cy.log("check the number of differences found")
            cy.get(elements.diffLineColumn).invoke('text').should('eq',testParameters.differenceNr)         

            // press reset buttons and check if the display areas are empty
            cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)


        })
    })

    context('Bigger size txt files - more then 100 words', () => {

        it('Upload and compare the same txt file', () => {

            cy.uploadFiles(fileName2, fileType_mimeType, elements.fileUploadBtn1)
            cy.uploadFiles(fileName2, fileType_mimeType, elements.fileUploadBtn2)

            // check if the name of the file uploaded appears next to "choose button"
            cy.checkUploadedFile(elements.fileUploadBtn1,fileName2)
            cy.checkUploadedFile(elements.fileUploadBtn2,fileName2)

            // check if the message 'File not supported!' appears in the display area
            cy.getTextValueDisplayArea(elements.displayArea1).should('not.eq',testParameters.errorMessage)
            cy.getTextValueDisplayArea(elements.displayArea2).should('not.eq',testParameters.errorMessage)

            mainPage.pressOnDifferenceBtn(elements.differenceBtn)

            // check footer elements for diff info - they should not exist
            cy.get(elements.diffInfo).should('not.be.visible')
        
            // compare dislpay areas text with the content of the file uploaded - they should be eq
            cy.compareFileTextToDisplayTest(filePath2, elements.displayArea1)
            cy.compareFileTextToDisplayTest(filePath2, elements.displayArea2)

            // compare the two display areas - they should be equal
            cy.compareText(elements.displayArea1, elements.displayArea2)


            // press reset buttons and check if the display areas are empty
            cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)
            
        })      


        it('Upload and compare two different txt files', () => {

            cy.uploadFiles(fileName2, fileType_mimeType, elements.fileUploadBtn1)
            cy.uploadFiles(fileName3, fileType_mimeType, elements.fileUploadBtn2)

            // check if the name of the file uploaded appears next to "choose button"
            cy.checkUploadedFile(elements.fileUploadBtn1,fileName2)
            cy.checkUploadedFile(elements.fileUploadBtn2,fileName3)

            // check if the message 'File not supported!' appears in the display area
            cy.getTextValueDisplayArea(elements.displayArea1).should('not.eq',testParameters.errorMessage)
            cy.getTextValueDisplayArea(elements.displayArea2).should('not.eq',testParameters.errorMessage)

            mainPage.pressOnDifferenceBtn(elements.differenceBtn)

            // check footer elements for diff info - they should not exist
            cy.get(elements.diffInfo).should('be.visible')
        
            // compare dislpay areas text with the content of the file uploaded - they should be eq
            cy.compareFileTextToDisplayTest(filePath2, elements.displayArea1)
            cy.compareFileTextToDisplayTest(filePath3, elements.displayArea2)

            // compare the two display areas - they should NOT be equal
            cy.log("compare the two display areas - they should NOT be equal")
            cy.compareTextNotEqual(elements.displayArea1, elements.displayArea2)    

            // check the number of differences found
            cy.log("check the number of differences found")
            cy.get(elements.diffLineColumn).invoke('text').should('eq',testParameters.differenceNr)      


            // press reset buttons and check if the display areas are empty
            cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)
            
        })       

          
        it('Compare a txt file with typed chars on second display area', () => {

            cy.uploadFiles(fileName2, fileType_mimeType, elements.fileUploadBtn1)

            // check if the name of the file uploaded appears next to "choose button"
            cy.checkUploadedFile(elements.fileUploadBtn1,fileName2)

            // check if the message 'File not supported!' appears in the display area
            cy.getTextValueDisplayArea(elements.displayArea1).should('not.eq',testParameters.errorMessage)

            // compare dislpay areas text with the content of the file uploaded - they should be eq
            cy.compareFileTextToDisplayTest(filePath2, elements.displayArea1)

            // write something in the display area 2
            cy.typeInDspAreaTextFromFile(filePath_NonAlfaNumChars, elements.displayArea2)

            // compare the two display areas - they should NOT be equal
            cy.compareTextNotEqual(elements.displayArea1, elements.displayArea2)

            mainPage.pressOnDifferenceBtn(elements.differenceBtn)

            // check footer elements for diff info - they should be visible
            cy.get(elements.diffInfo).should('be.visible')

            // check the number of differences found
            cy.log("check the number of differences found")
            cy.get(elements.diffLineColumn).invoke('text').should('eq',testParameters.differenceNr)  

            // press reset buttons and check if the display areas are empty
            cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)

        })
        
    

    })

})
  