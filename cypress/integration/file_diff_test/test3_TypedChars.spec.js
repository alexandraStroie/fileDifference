/// <reference types="Cypress" />
import '../../general_commands/commands'
import mainPage from '../../functions/functions'
import {navigateToApp} from '../../navigations/navigations'
import testParameters from '../../parameters/testParameters.json'
import elements from '../../elements/elements_json'

Cypress.env('RETRIES', testParameters.nrOfRetries)

const filePath1 = testParameters.pathTxtFile4
const filePath2 = testParameters.pathTxtFile1
const filePath3 = testParameters.pathTxtFile5


describe('Type characters in the display areas and compare them', () => {

        beforeEach(() => {
            navigateToApp();
        })
  
    it('Type the same characters in the display areas and compare them', () => {
    
         // type characters form txt files and press the Difference button
        cy.typeInDspAreaTextFromFile(filePath1, elements.displayArea1)
        cy.typeInDspAreaTextFromFile(filePath1, elements.displayArea2)

        mainPage.pressOnDifferenceBtn(elements.differenceBtn)

        // check footer elements for diff info - they should not exist
        cy.get(elements.diffInfo).should('not.be.visible')

        // press reset buttons and check if the display areas are empty
        cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)

    })

                
      
    it('Type different characters in the display areas and compare them ', () => {

        // type characters form txt files and press the Difference button
        cy.typeInDspAreaTextFromFile(filePath1, elements.displayArea1)
        cy.typeInDspAreaTextFromFile(filePath2, elements.displayArea2)

        mainPage.pressOnDifferenceBtn(elements.differenceBtn)

        // check footer elements for diff info - they should not exist
        cy.get(elements.diffInfo).should('be.visible')

        // check the number of differences found
        cy.log("check the number of differences found")
        cy.get(elements.diffLineColumn).invoke('text').should('eq',testParameters.differenceNr)

        // press reset buttons and check if the display areas are empty
        cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)

    })   

    it('Type the same non alphanumeric characters in the display areas and compare them', () => {

        // type characters form txt files and press the Difference button
        cy.typeInDspAreaTextFromFile(filePath3, elements.displayArea1)
        cy.typeInDspAreaTextFromFile(filePath3, elements.displayArea2)

        mainPage.pressOnDifferenceBtn(elements.differenceBtn)

        // check footer elements for diff info - they should not exist
        cy.get(elements.diffInfo).should('not.be.visible')

        // press reset buttons and check if the display areas are empty
        cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)
    })   

    it('Type non alphanumeric characters in one display area and normal text in second display area and compare', () => {

        // type characters form txt files and press the Difference button
        cy.typeInDspAreaTextFromFile(filePath3, elements.displayArea1)
        cy.typeInDspAreaTextFromFile(filePath1, elements.displayArea2)

        mainPage.pressOnDifferenceBtn(elements.differenceBtn)

        // check footer elements for diff info - they should not exist
        cy.get(elements.diffInfo).should('be.visible')

        // check the number of differences found
        cy.log("check the number of differences found")
        cy.get(elements.diffLineColumn).invoke('text').should('eq',testParameters.differenceNr)

        // press reset buttons and check if the display areas are empty
        cy.pressResetBtnsAndCompareDspAreas(elements.clearBtn1,elements.clearBtn2,elements.displayArea1,elements.displayArea2)

    })  
})
  