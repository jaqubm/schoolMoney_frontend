import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

type Transaction = {
  date: string;
  type: string;
  amount: number;
  name: string;
  surname: string;
};

type Transactions = {
  transactions: Transaction[];
};

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
