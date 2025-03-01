import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";

const generatePDF = () => {
    let data = useSelector((state) => state.calculateReading);
    const doc = new jsPDF();
    const curDate = new Date().toLocaleDateString();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Transaction Summary", 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let y = 30;

    // Step 1: Reading Difference
    doc.text("Step 1: Reading Difference", 14, y);
    y += 6;
    autoTable(doc, {
        startY: y,
        head: [["Start", "End", "Price", "Total"]],
        body: data.pumpReadingStarts.map((start, index) => [
            start,
            data.pumpReadingEnds[index],
            data.prices[index],
            ((data.pumpReadingEnds[index] - start) * data.prices[index]).toFixed(2)
        ]),
        theme: "grid",
    });
    y = doc.lastAutoTable.finalY + 10;

    // Step 2: UPI Difference
    doc.text("Step 2: UPI Difference", 14, y);
    y += 6;
    autoTable(doc, {
        startY: y,
        head: [["UPI Start", "UPI End", "Difference"]],
        body: data.upiStart.map((start, index) => [
            start,
            data.upiClose[index],
            (data.upiClose[index] - start).toFixed(2)
        ]),
        theme: "grid",
    });
    y = doc.lastAutoTable.finalY + 10;

    // Step 3-5: Payment Totals
    doc.text("Step 3-5: Payment Totals", 14, y);
    y += 6;
    autoTable(doc, {
        startY: y,
        head: [["Card Payments", "In-Lend", "Cash Payments"]],
        body: [
            [
                data.cards.join(", ") || "0",
                data.inlends.join(", ") || "0",
                data.cash.join(", ") || "0"
            ]
        ],
        theme: "grid",
    });
    y = doc.lastAutoTable.finalY + 10;

    // Step 6: Total Calculation
    const totalSum = data.cards.reduce((a, b) => a + b, 0) +
        data.inlends.reduce((a, b) => a + b, 0) +
        data.cash.reduce((a, b) => a + b, 0) +
        data.upiStart.reduce((total, start, index) => total + (data.upiClose[index] - start), 0);
    
    doc.text("Step 6: Total Calculation", 14, y);
    y += 6;
    autoTable(doc, {
        startY: y,
        head: [["Cards", "In-Lend", "Cash", "UPI", "Total"]],
        body: [[
            data.cards.reduce((a, b) => a + b, 0).toFixed(2),
            data.inlends.reduce((a, b) => a + b, 0).toFixed(2),
            data.cash.reduce((a, b) => a + b, 0).toFixed(2),
            data.upiStart.reduce((total, start, index) => total + (data.upiClose[index] - start), 0).toFixed(2),
            totalSum.toFixed(2)
        ]],
        theme: "grid",
    });
    y = doc.lastAutoTable.finalY + 10;

    // Step 7: Final Difference
    const readingDifference = data.pumpReadingStarts.reduce((total, start, index) => {
        return total + (data.pumpReadingEnds[index] - start) * data.prices[index];
    }, 0);
    const finalDifference = totalSum - readingDifference;

    doc.text("Step 7: Final Difference", 14, y);
    y += 6;
    autoTable(doc, {
        startY: y,
        head: [["Total Transactions", "Reading Total", "Difference"]],
        body: [[totalSum.toFixed(2), readingDifference.toFixed(2), finalDifference.toFixed(2)]],
        theme: "grid",
    });

    doc.save(`${curDate}_Transaction_Summary.pdf`);
};

export default generatePDF;
