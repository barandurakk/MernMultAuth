const validateName = (name) => {
  const re = /^[a-z ,.'-]+$/;
  return re.test(name.toLowerCase());
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    return re.test(email);
}

const isEmpty = (data) => { 
  const re = /^(?![\s\S])/;
  return re.test(data);
}

const validatePassword = (password) => {
  const re = /^[A-Za-z]\w{7,14}$/;  
  return re.test(password);
}

export const validateFormData = (formData) => {
  let error = {};

  if(!validateEmail(formData.email) || isEmpty(formData.email)){
    
    error.email = "Please enter a valid email!";
  }

  if(formData.name){ //is name exist (solve)
    if(isEmpty(formData.name) || !validateName(formData.name)){
      error.name= "Please enter a valid name!";
    }
  }
 

  if(!validatePassword(formData.password) || isEmpty(formData.password)){
    error.password = "Password should be 7 to 15 characters, which contain only characters, numeric digits, underscore and first character must be a letter";
  }

  return error;

}
