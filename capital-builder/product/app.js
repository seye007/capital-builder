const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const rootElement = document.getElementById("root");

// Create a new instance of CapitalBuilder
const svs = new productService.CapitalBuilder(rootElement);

// Add event listeners to the buttons
nextBtn.addEventListener("click", moveToNextStep);
prevBtn.addEventListener("click", moveToPreviousStep);

// Initial setup
svs.show();
// Call this function to initially set the button state.
updateButtonState();

function moveToNextStep() {
  // Validate the current step
  const isValid = svs.validateStep();

  if (isValid) {
    // Move to the next step
    svs.moveToNextStep();
    svs.updateProgressbar();
    // Update the button state
    updateButtonState();
  }
}

function moveToPreviousStep() {
  // Move to the previous step
  svs.moveToPreviousStep();
  svs.updateProgressbar();
  // Update the button state
  updateButtonState();
}

function updateButtonState() {
  // Enable or disable the "Next" and "Previous" buttons based on the current step
  if (svs.currentStep === svs.minStep) {
    console.log(svs.currentStep);
    prevBtn.disabled = true;
    nextBtn.disabled = false;
  } else if (svs.currentStep === svs.maxStep) {
    console.log(svs.currentStep);
    prevBtn.disabled = false;
    nextBtn.disabled = true;
  } else {
    console.log(svs.currentStep);
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
}
