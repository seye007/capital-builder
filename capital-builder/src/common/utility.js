import swal from 'sweetalert';

export const Utility = (() => {

  function showAlert(name, errorMessage = 'is required') {
	swal(`${name} ${errorMessage}`, {
      icon: "warning",
	});
  }

  function validateCurrentStep() {
    const formElements = document.querySelectorAll('form input, form select');

    for (const element of formElements) {
      const name = element.name;
      const value = element.value;

      if (!value) {
        showAlert(name);
        return false;
      }
    }

    return true;
  }

  function setUpFileValidation(idUploaderFile, idUploaderFileText) {

  const fileInput = document.getElementById(idUploaderFile);

  fileInput.addEventListener('change', function () {
    validateFile(this, idUploaderFileText, 512000);
  });
}

  function validateFile(fileDOM, fileTextDOM, fileSize = 2097152) {

    const file = fileDOM.files[0];

    // Check if a file is selected
    if (!file) {
      showAlert('Image');
      fileDOM.value = "";
      return;
    }

    var url = fileDOM.value;
    const fileTextElement = document.getElementById(fileTextDOM);
    fileTextElement.value = url;
    // Get the file extension from the MIME type and convert to lowercase
    const fileType = file.type.toLowerCase();
    const fileExtension = fileType.split('/').pop();

    // Check file format (only images (JPEG, PNG) and PDFs allowed) and convert extensions to lowercase
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
    if (!allowedExtensions.includes(fileExtension)) {
      showAlert('', 'Invalid file format. Only images (JPEG, PNG) and PDFs are allowed.',);
      fileDOM.value = ''; 
      fileTextElement.value = '';
      return;
    }

    // Check file size (limit to 4MB, adjust as needed)
    if (file.size > fileSize) {
      showAlert('', "Image too large");
      fileDOM.value = "";
      fileTextElement.value = '';
      return;
    }
  }

  function setUpDatePicker() {
    $('#date').datepicker({
      dateFormat: 'dd-M-yy',
      maxDate: 0
    });
    $('#startDate').datepicker({
      dateFormat: 'dd-M-yy',
      minDate: 1
    });

  }

  return {
    validateCurrentStep: validateCurrentStep,
    setUpFileValidation: setUpFileValidation,
    setUpDatePicker, setUpDatePicker
  };
})();
