export default function OrderSuccessPage() {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600">🎉 Order Placed!</h1>
        <p className="mt-4 text-lg">Thank you! Your order has been received.</p>
        <a href="/" className="mt-6 inline-block text-blue-600 underline">
          Continue Shopping
        </a>
      </div>
    );
  }
  