// uploads files
Cypress.Commands.add('uploadFiles', (fileName, fileType, element) => {
  cy.fixture(fileName).then(fileContent => {
    cy.get(`${element}`).upload(
      { fileContent, fileName, mimeType: fileType, encoding:'utf8'},
      { subjectType: 'input' },
    );
  });

})


// check if the name of the file uploaded appears next to "choose button"
Cypress.Commands.add('checkUploadedFile', (fileUpldSelector, fileName) => {
  cy.get(fileUpldSelector).invoke('val').should('contain',fileName)
})


// compareText - compares the two display areas and expects results to be equal
Cypress.Commands.add('compareText', (element1,element2) => {
  cy.get(element1)
    .invoke('val')
    .then(text1 => {
      cy.get(element2)
        .invoke('val')
        .should(text2 => {
          expect(text2).to.eq(text1)
      })
  })
})


// compareTextNotEqual - compares the two display areas and expects results to NOT be equal
Cypress.Commands.add('compareTextNotEqual', (element1,element2) => {
  cy.get(element1)
    .invoke('val')
    .then(text1 => {
      cy.get(element2)
        .invoke('val')
        .should(text2 => {
          expect(text2).to.not.be.eq(text1)
      })
  })
})


// get text value from display area
Cypress.Commands.add('getTextValueDisplayArea', (element) => {
  cy.get(element).invoke('val')

})

// compare dislpay are text with the text form the file uploaded
Cypress.Commands.add('compareFileTextToDisplayTest', (pathFile,elementDisplayArea) => {
  cy.readFile(pathFile).then(valTextFile => {
    cy.getTextValueDisplayArea(elementDisplayArea).should(valTextDisplayArea => {
      expect(valTextFile).to.eq(valTextDisplayArea)
  })
})
})


// types in display area the text read form a file
Cypress.Commands.add('typeInDspAreaTextFromFile', (pathFile,elementDisplayArea) => {
  cy.readFile(pathFile).then(valTextFile => {
    cy.get(elementDisplayArea).type(valTextFile)
  })
})


// clicks reset buttons and checks if the display areas are empty
Cypress.Commands.add('pressResetBtnsAndCompareDspAreas', (rstBtn1,rstBtn2,dspArea1,dspArea2) => {
  cy.get(rstBtn1).click()
  cy.getTextValueDisplayArea(dspArea1).should('be.empty') 
  cy.get(rstBtn2).click()
  cy.getTextValueDisplayArea(dspArea2).should('be.empty') 
})

