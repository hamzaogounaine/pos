import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Courier',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    margin: '0 auto',
  },
  storeInfo: {
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  receiptInfo: {
    marginBottom: 10,
  },
  table: {
    width: '100%',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableCol: {
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  footer: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 8,
  },
});

// PDF Receipt Component
const ReceiptPDF = ({ receiptData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo and Store Info */}
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src="https://via.placeholder.com/50" // Replace with your logo URL
        />
        <Text style={styles.storeInfo}>
          SUPER MARKET
          {"\n"}123 Street Name, City
          {"\n"}Phone: +123 456 7890
          {"\n"}Email: info@supermarket.com
        </Text>
        <View style={styles.divider} />
      </View>

      {/* Receipt Info */}
      <View style={styles.receiptInfo}>
        <Text>Receipt No: {receiptData.receiptNo}</Text>
        <Text>Date: {receiptData.date}</Text>
        <Text>Customer: {receiptData.customerName}</Text>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text>Item</Text>
          <Text style={styles.tableCol}>Qty</Text>
          <Text style={styles.tableCol}>Price</Text>
          <Text style={styles.tableCol}>Total</Text>
        </View>
        <View style={styles.divider} />
        {receiptData.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text>{item.name}</Text>
            <Text style={styles.tableCol}>{item.qt}</Text>
            <Text style={styles.tableCol}>{item.price.toFixed(2)} MAD</Text>
            <Text style={styles.tableCol}>
              {(item.price * item.qt).toFixed(2)} MAD
            </Text>
          </View>
        ))}
        <View style={styles.divider} />
      </View>

      {/* Total */}
      <View style={styles.totalRow}>
        <Text>Grand Total:</Text>
        <Text>{receiptData.total.toFixed(2)} MAD</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for shopping with us!</Text>
        <Text>Visit us again soon.</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPDF;
