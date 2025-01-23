const calculateBtn = document.getElementById("calculate_btn");

const inputContainers = document.getElementsByClassName("input_containers");
const inputFields = document.getElementsByClassName("input_field");
const symbols = document.getElementsByClassName("symbol");
const errors = document.getElementsByClassName("error");
const radioContainers = document.getElementsByClassName("radio_containers");
const radioFields = document.getElementsByName("radio1");
const clearAll = document.getElementById("clear_all");
const byDefault = document.getElementsByClassName("by_default");
const onResult = document.getElementsByClassName("on_result");
const totalRepayments = document.getElementById("total_repayments");
const monthlyRepayments = document.getElementById("monthly_repayments");

calculateBtn.addEventListener("click", () => {
  const isAllFilled = checkIsAllFieldsFilled();
  if (isAllFilled) {
    // alert("all fields are filled");
    showResult();
  } else {
    alert("fill all fields please");
  }
});

function checkIsAllFieldsFilled() {
  // CHECK FOR ALL 3 INPUT FIELDS
  let isAllFilled = 1;
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value.trim() == "") {
      inputContainers[i].style.border = "1px solid red";
      symbols[i].style.backgroundColor = "red";
      errors[i].style.display = "block";
      isAllFilled = 0;
    } else {
      inputContainers[i].style.border = "";
      symbols[i].style.backgroundColor = "";
      errors[i].style.display = "";
    }
  }
  return isAllFilled;
}

// CLEAR ALL FIELDS
clearAll.addEventListener("click", () => {
  for (let i = 0; i < inputFields.length; i++) {
    inputContainers[i].style.border = "";
    symbols[i].style.backgroundColor = "";
    errors[i].style.display = "";
    inputFields[i].value = "";
  }
  radioFields[0].checked = false;
  radioFields[1].checked = false;
  byDefault[0].style.display = "flex";
  onResult[0].style.display = "none";
});

function showResult() {
  let mortgageAmount = inputFields[0].value.trim(); // Mortgage amount
  let monthlyRate = inputFields[2].value.trim() / 12; // Monthly interest rate
  let totalMonths = inputFields[1].value.trim() * 12; // Total number of payments
  const mortgageType = document.querySelector(
    'input[name="radio1"]:checked'
  ).value;

  let monthlyRepayment = 0;
  let totalRepayment = 0;

  if (mortgageType === "Repayment") {
    // Repayment mortgage formula
    monthlyRepayment =
      (mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    totalRepayment = monthlyRepayment * totalMonths;
  } else if (mortgageType === "Interest Only") {
    // Interest-only formula
    monthlyRepayment = mortgageAmount * monthlyRate;
    totalRepayment = monthlyRepayment * totalMonths;
  }

  totalRepayments.innerHTML = `&#8377 ${totalRepayment.toFixed(3)}`;
  monthlyRepayments.innerHTML = `&#8377 ${monthlyRepayment.toFixed(3)}`;

  byDefault[0].style.display = "none";
  onResult[0].style.display = "flex";
}
