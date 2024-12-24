'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ReceiptPDF from './ReceiptPDF';
import { X } from 'lucide-react';

const getProducts = async () => {
    const data = await fetch('http://127.0.0.1:8000/products');
    if (data.ok) {
        return data.json();
    }
};

const Page = () => {
    const [printReceipt, setPrintReceipt] = useState(false);
    const [productList, setProductList] = useState([]);
    const [receiptItems, setReceiptItems] = useState([]);
    const [receiptData, setReceiptData] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProductList(products);
        };
        fetchProducts();
    }, []);

    const handleAddToReceipt = (product) => {
        setReceiptItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, qt: item.qt + 1 } : item
                );
            } else {
                return [...prev, { ...product, qt: 1 }];
            }
        });
    };

    const handleRemoveFromReceipt = (productId) => {
        setReceiptItems((prev) =>
            prev
                .map((item) =>
                    item.id === productId && item.qt > 0
                        ? { ...item, qt: item.qt - 1 }
                        : item
                )
                .filter((item) => item.qt > 0)
        );
    };

    const handlePrint = () => {
        setPrintReceipt(true);
        setReceiptData({
            receiptNo: 1,
            date: new Date().toLocaleDateString(),
            customerName: 'John Doe',
            items: receiptItems,
            total: receiptItems.reduce((acc, item) => acc + item.price * item.qt, 0),
        });
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="text-lg">Order Page</h1>
                <div className="flex gap-3">
                    <Input placeholder="Search for products" className="w-1/4" />
                    <Button>Search</Button>
                </div>
                <div className="flex gap-3">
                    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-4 gap-3 max-h-screen overflow-y-auto">
                        {productList.map((product) => (
                            <Card key={product.id}>
                                <CardContent>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full my-3"
                                    />
                                    <h1 className="text-lg">{product.name}</h1>
                                    <p className="text font-bold">{product.price} MAD</p>
                                    <p className="text-sm text-gray-600">In stock</p>
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleAddToReceipt(product)}
                                    >
                                        {`Add to Receipt`}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div>
                        <Card className="w-80">
                            <CardHeader>
                                <h2 className="text-lg font-bold">Receipt</h2>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                {receiptItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div>
                                            <span>{item.name}</span>
                                            <span> ({item.qt})</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>{item.price} MAD x {item.qt}</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleRemoveFromReceipt(item.id)}
                                            >
                                                -
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>
                                    {receiptItems.reduce(
                                        (acc, item) => acc + item.price * item.qt,
                                        0
                                    ).toFixed(2)}{' '}
                                    MAD
                                </span>
                                <Button variant="secondary" onClick={handlePrint}>
                                    Print
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            {printReceipt && (
                <div className="absolute  inset-0  w-1/2 m-auto bg-secondary ps-4 rounded border my-5">
                    <div className='flex justify-between items-center'>
                        <h3>PDF Preview:</h3>
                        <Button variant='ghost' className='cursor-pointer z-50' onClick={() => setPrintReceipt(false)}><X /></Button>
                    </div>
                    <PDFViewer style={{ width: '100%', height: '600px' }}>
                        <ReceiptPDF receiptData={receiptData} />
                    </PDFViewer>
                    <br />
                    <PDFDownloadLink
                        document={<ReceiptPDF receiptData={receiptData} />}
                        fileName="receipt.pdf"
                    >
                        <Button>
                            {({ loading }) => (loading ? 'Generating PDF...' : 'Download Receipt')}
                        </Button>
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default Page;
