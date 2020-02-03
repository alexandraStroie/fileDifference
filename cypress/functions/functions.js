// import {API_LOAD_FIRST_PAGE} from '../../api/apis'

const pressOnDifferenceBtn = element => {
    return cy
      .get(`${element}`)
      .click()
  }


const checkShowOnlyDiff = element => {
  return cy
    .get(`${element}`)
    .check()
}


const pressResetBtn = element => {
  return cy
    .get(`${element}`)
    .click()
}


const clickDispayArea = element => {
  return cy
    .get(`${element}`)
    .click()
}

const getChooseFileBtn = element => {
  return cy
    .get(`${element}`)
}


export default {
  pressOnDifferenceBtn,
  checkShowOnlyDiff,
  pressResetBtn,
  clickDispayArea,
  getChooseFileBtn
  
}

