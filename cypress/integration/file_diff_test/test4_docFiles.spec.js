/// <reference types="Cypress" />
import 'cypress-file-upload';
import '../../general_commands/commands'
import mainPage from '../../functions/functions'
import {navigateToApp} from '../../navigations/navigations'
import testParameters from '../../parameters/testParameters.json'
import elements from '../../elements/elements_json'

Cypress.env('RETRIES', testParameters.nrOfRetries)

const fileName1 = testParameters.docFile_100kb;
const fileType_mimeType1 = 'application/msword';
// const fileInput1 = '[name="fileInput1"]';

const fileName2 = testParameters.docFile_1Mb;
const fileType_mimeType2 = 'application/msword';
// const fileInput2 = '[name="fileInput1"]';


describe('Upload and compare .doc files', () => {

    beforeEach(() => {
        navigateToApp();
    })
  
    it('Compapre two different doc files of small sizes', () => {

        cy.uploadFiles(fileName1, fileType_mimeType1, elements.fileUploadBtn1)
        cy.uploadFiles(fileName2, fileType_mimeType2, elements.fileUploadBtn2)

        // check if the name of the file uploaded appears next to "choose button"
        cy.checkUploadedFile(elements.fileUploadBtn1,fileName1)
        cy.checkUploadedFile(elements.fileUploadBtn2,fileName2)

        // check if the message 'File not supported!' appears in the display area
        cy.getTextValueDisplayArea(elements.displayArea1).should('not.eq',testParameters.errorMessage)
        cy.getTextValueDisplayArea(elements.displayArea2).should('not.eq',testParameters.errorMessage)

        cy.log('press difference button')
        mainPage.pressOnDifferenceBtn(elements.differenceBtn)
        cy.get(elements.diffInfo).should('be.visible') 

        // compare dislpay areas text with the content of the file uploaded - they should be eq
        cy.log('compare dislpay areas text with the content of the file uploaded - they should be eq')
        cy.compareFileTextToDisplayTest(testParameters.pathTxtFile1, elements.displayArea1)
        cy.compareFileTextToDisplayTest(testParameters.pathTxtFile2, elements.displayArea2)

        // compare the two display areas - they should NOT be equal
        cy.log('compare the two display areas - they should NOT be equal')
        cy.compareTextNotEqual(elements.displayArea1, elements.displayArea2)


        // check footer elements
        cy.log('check footer elements')
        cy.get(elements.diffColumnCls).should('contain', 'Difference')
        cy.get(elements.emptyColumCls).should('contain','Empty')
        cy.get(elements.insertColumnCls).should('contain','Insert')
        cy.get(elements.deleteColumnCls).should('contain','Delete')

        cy.get(elements.diffLineColumn).should('contain',testParameters.differenceNr)
        cy.get(elements.emptyLineColumn).should('contain',testParameters.emptyColNr)
        cy.get(elements.insertLineColumn).should('contain',testParameters.insertColNr)
        cy.get(elements.deleteLineCloumn).should('contain',testParameters.deleteColNr)

        // press reset buttons and check if the display areas are empty
        cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)
    })      


    it('Upload the same doc file for both display areas', () => {

        cy.uploadFiles(fileName1, fileType_mimeType1, elements.fileUploadBtn1)

        // check if the name of the file uploaded appears next to "choose button"
        cy.checkUploadedFile(elements.fileUploadBtn1,fileName1)

        // check if the message 'File not supported!' appears in the display area
        cy.getTextValueDisplayArea(elements.displayArea1).should('not.eq',testParameters.errorMessage)
        cy.getTextValueDisplayArea(elements.displayArea2).should('not.eq',testParameters.errorMessage)

        cy.log('press difference button')
        mainPage.pressOnDifferenceBtn(elements.differenceBtn)
        cy.get(elements.diffInfo).should('be.visible')


        // compare dislpay areas text with the content of the file uploaded - they should be eq
        cy.log('compare dislpay areas text with the content of the file uploaded - they should be eq')
        cy.compareFileTextToDisplayTest(testParameters.pathTxtFile1, elements.displayArea1)

        // compare the two display areas - they should NOT be equal
        cy.log('compare the two display areas - they should NOT be equal')
        cy.compareText(elements.displayArea1, elements.displayArea2)

        // check footer elements for diff info - they should not exist
        cy.get(elements.diffInfo).should('not.be.visible')

        // press reset buttons and check if the display areas are empty
        cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)
    })      

  })
  