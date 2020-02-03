/// <reference types="Cypress" />
import 'cypress-file-upload';
import '../../general_commands/commands'
import mainPage from '../../functions/functions'
import {navigateToApp} from '../../navigations/navigations'
import testParameters from '../../parameters/testParameters.json'
import elements from '../../elements/elements_json'

Cypress.env('RETRIES', testParameters.nrOfRetries)

const fileName1 = testParameters.txtFilename1;
const fileType_mimeType1 = 'text/txt';
const fileName2 = testParameters.txtFilename2;
const fileType_mimeType2 = 'text/txt';

describe('Upload and compare txt files', () => {

        beforeEach(() => {
        navigateToApp();
        })
  
    it('Compare two different txt files of small sizes (no more then 10 words each) that contain only one difference', () => {

        cy.log('upload a .txt files')

        cy.uploadFiles(fileName1, fileType_mimeType1, elements.fileUploadBtn1)
        cy.uploadFiles(fileName2, fileType_mimeType2, elements.fileUploadBtn2)
        
        // check if the extension (.doc, .pdf etc) of the file uploaded appears next to "choose button"
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

        // check the page title
        cy.log('check page title', testParameters.pageTitle)
        cy.get('.fileDiffMainContainer').get('.fileViewHead').invoke('text').should('eq', testParameters.pageTitle)


        // check if get value of display area is the same as in Base Text
        cy.log('check if get value of display area is the same as in Base Text')
        cy.getTextValueDisplayArea(elements.displayArea1).then(dispAreaValue => {
            cy.get('tbody > tr > .replace').eq(0).invoke('text').should(baseTxtDiff => {
                expect(dispAreaValue).to.eq(baseTxtDiff)
            })
        }) 

        cy.getTextValueDisplayArea(elements.displayArea2).then(dispAreaValue => {
            cy.get('tbody > tr > .replace').eq(1).invoke('text').should(baseTxtDiff => {
                expect(dispAreaValue).to.eq(baseTxtDiff)
            })
        }) 

        // check the differencer footer
        cy.get(elements.footerElements).eq(0).should('contain', testParameters.baseText)
        cy.get(elements.footerElements).eq(1).should('contain', testParameters.newText)

        cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)
        })      
  })
  