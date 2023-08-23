document.addEventListener("DOMContentLoaded", function () {
  const transactionType = document.getElementById("transactionType");
  const amount = document.getElementById("amount");
  const submitBtn = document.getElementById("submitBtn");
  const transactionList = document.getElementById("transactionList");
  const balanceSpan = document.getElementById("balance");

  let balance = 0;

  submitBtn.addEventListener("click", function () {
    const type = transactionType.value;
    const transactionAmount = parseFloat(amount.value);

    if (isNaN(transactionAmount)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (0 >= transactionAmount) {
      alert("Transaction must be greater than 0");
      return;
    }

    if (type === "debit") {
      balance -= transactionAmount;
    } else if (type === "credit") {
      balance += transactionAmount;
    }

    balanceSpan.textContent = balance.toFixed(2);

    const listItem = document.createElement("li");
    listItem.className = `list-group-item ${type === "debit" ? "list-group-item-danger" : "list-group-item-success"}`;
    listItem.textContent = `${type.toUpperCase()}: AED ${transactionAmount.toFixed(2)}`;
    transactionList.appendChild(listItem);

    amount.value = "";
  });

  document.getElementById("generatePdfBtn").addEventListener("click", function() {
    const pdf = new jsPDF();
    const transactions = document.getElementById("transactionList").innerHTML;
    const balance = document.getElementById("balance").textContent;

    pdf.text("Transaction History", 10, 10);
    pdf.fromHTML(transactions, 10, 20);
    pdf.text(`Total Balance: ${balance}`, 10, pdf.autoTable.previous.finalY + 10);

    pdf.save("transaction_history.pdf");
  });

});

