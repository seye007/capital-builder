// Import the required modules and styles
import Step1Page from "./Common/step-1.handlebars";
import Step2Page from "./Common/step-2.handlebars";
import step3Page from "./Common/step-3.handlebars";
import navigation from "./Common/navigation-bar.handlebars";
import { Utility } from "./Common/utility";
import "./css/form-element.css";
import "./css/responsive.css";
import "./css/utilities.css";
import "./css/smart-forms/smart-addons.css";
import "./css/smart-forms/smart-forms.css";

// Define the CapitalBuilder class
export class CapitalBuilder {
  constructor(elem) {
    // Initialize the target element, current step, and the step array
    this.targetElement = elem;
    this.currentStep = 1;
    this.minStep = 1;
    this.maxstep = 3;
    this.data = [];
    this.stepArray = [
      { stepId: 1, validation: this.validateStep1.bind(this), loadPage: this.loadStep1.bind(this) },
      { stepId: 2, validation: this.validateStep2.bind(this), loadPage: this.loadStep2.bind(this) },
      { stepId: 3, validation: null, loadPage: this.loadStep3.bind(this) },
    ]
  }

  // Show the current step
  show() {
    const stepObject = this.getStepObject();
    stepObject.loadPage();
  }

  // Load step 1 page
  loadStep1() {
    const page = Step1Page({});
    this.targetElement.innerHTML = page;
    Utility.setUpDatePicker();
    Utility.setUpFileValidation('idUploaderFile', 'idUploaderFileText')
  }

  // Load step 2 page
  loadStep2() {
    const page = Step2Page({});
    this.targetElement.innerHTML = page;
  }

  // Load step 2 page
  loadStep3() {
    const data = this.constructStep3Data();
    console.log(data);
    const page = step3Page({ data }); 
    this.targetElement.innerHTML = page.trim();
  }

  // Validate step 1
  validateStep1() {
    const isValid = Utility.validateCurrentStep();
    return isValid;
  }

  storeStepData() {
    const formElements = document.querySelectorAll('form input, form select');
    const formData = {};
    formElements.forEach(element => {
      const name = element.name;
      const value = element.value;
      if (name) {
        formData[name] = value;
      }
    });

    const formObj = this.data.find(item => item.stepId === this.currentStep);
    if (formObj) {
      formObj.data = formData;
    } else {
      this.data.push({
        stepId: this.currentStep,
        data: formData
      });
    }
  }


  setFormValues() {
    const formData = this.data[this.currentStep - 1].data;

    for (const [name, value] of Object.entries(formData)) {
      const elements = document.getElementsByName(name);

      if (elements.length > 0) {
        if (elements[0].tagName === 'SELECT') {
          const option = elements[0].querySelector(`[value="${value}"]`);
          if (option) {
            option.selected = true;
          }
        }
        else if (elements[0].type === 'checkbox') {
          for (const element of elements) {
            element.checked = value;
          }
        }
        else {
          for (const element of elements) {
            if (element.name !== 'IdetificationImage' && element.name !== 'IdetificationText') {
              element.value = value;
            }
            }
          }
        }
      }
    }

  // Validate step 2
  validateStep2() {
    return Utility.validateCurrentStep();
  }

  // Get the current step object
  getStepObject() {
    return this.stepArray.find((item) => item.stepId == this.currentStep);
  }


  // Move to the next step
  moveToNextStep() {
    if (this.currentStep < this.stepArray.length) {
      this.storeStepData();
      this.currentStep++;
      this.show();
    }
  }

  // Move to the previous step
  moveToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.show();
      this.setFormValues();
    }
  }

  // Validate the current step
  validateStep() {
    const stepObject = this.getStepObject();
    return stepObject.validation();
  }

  // Set a new current step
  setNewStep(newValue) {
    this.currentStep = newValue;
  }

  updateDataWithFormValues(step) {
    const formData = new FormData(document.forms["productForm"]);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    this.Data[step - 1].data = data;
  }

  constructStep3Data() {
    // Retrieve values from step 1 data
    const startDate = this.data[0].data['StartDate'];

    // Retrieve values from step 2 data
    const paymentFrequency = this.data[1].data['PaymentFrequency'];
    const premium = "₦" + this.data[1].data['Premium'];
    const policyTerm = this.data[1].data['PolicyTerm'];
    const targetAmount = "₦" + this.data[1].data['TargetAmount'];
    const lifeSumAssured = "₦" + this.data[1].data['LifeSumAssured'];

    // Construct the clientName dynamically based on available data
    const title = this.data[0].data['Title'];
    const firstName = this.data[0].data['FirstName'];
    const middleName = this.data[0].data['MiddleName'];
    const lastName = this.data[0].data['Surname'];
    const clientNameParts = [title, firstName, middleName, lastName].filter(Boolean);
    const clientName = clientNameParts.join(' ');

    const data = [
      { key: "Client Name", value: clientName, id: "pre_client_name_data" },
      { key: "Product Name", value: "Capital Builder", id: "product_name_data" },
      { key: "Quote Code", value: "12345", id: "reference_number_data" },
      { key: "Start Date", value: startDate, id: "start_date_data" },
      { key: "Payment Frequency", value: paymentFrequency, id: "payment_frequency_data" },
      { key: "Premium", value: premium, id: "premium_data" },
      { key: "Policy Term", value: policyTerm, id: "policy_term_data" },
      { key: "Target Amount", value: targetAmount, id: "target_amount_data" },
      { key: "Life Sum Assured", value: lifeSumAssured, id: "life_sum_assured_data" },
    ];

    return data;
  }


  updateProgressbar() {
    //const navElementString = navigation({});
    //const tempDiv = document.createElement('div');
    //tempDiv.innerHTML = navElementString.trim();
    // console.log(navElementString.trim());
    const progress = document.querySelector(".progress");
    console.log(`this is the handlebar element: ${progress}`);
    const progressSteps = document.querySelectorAll(".progress-step");

    progressSteps.forEach((progressStep, idx) => {
        if (idx < this.currentStep) {
            progressStep.classList.add("progress-step-active");
        } else {
            progressStep.classList.remove("progress-step-active");
        }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";

    // Assuming you want to append the progress bar to the document
    //progress.appendChild(tempDiv);
}

}
