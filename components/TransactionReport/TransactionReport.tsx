import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { Transactions } from "@/app/transaction/Transaction.types";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20 },
  text: { fontSize: 12, marginBottom: 10 },
});

const TransactionReport = ({ transactions }: Transactions) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Transaction Report</Text>
      {transactions.map((transaction, index) => (
        <Text key={index} style={styles.text}>
          {transaction.date} - {transaction.type} - $
          {transaction.amount.toFixed(2)} - {transaction.name}{" "}
          {transaction.surname}
        </Text>
      ))}
    </Page>
  </Document>
);

export default TransactionReport;
