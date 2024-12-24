import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const getProducts = async () => {
  const data = await fetch('http://127.0.0.1:8000/products')
  if (data.ok) {
    return data.json()
  }
  
}

export default async function Home() {
  const products = await getProducts()
  console.log(products)

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className='title'>Today&apos;s Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">$1,250</p>
            <p className="text-sm text-gray-600">Total revenue today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='title'>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">45</p>
            <p className="text-sm text-gray-600">Total transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='title'>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">5</p>
            <p className="text-sm text-gray-600">Products with low stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <Button variant="secondary"><Link href='order'>Create an order</Link></Button>
          <Button variant="secondary">Add Product</Button>
          <Button variant="secondary">View Reports</Button>
          <Button variant="secondary">Manage Inventory</Button>
        </div>
      </div>
    </div>
  );
}