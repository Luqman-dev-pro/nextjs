export default function OrderFailedPage() {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">❌ Order Failed</h1>
        <p className="mt-4 text-lg">Oops! Something went wrong. Please try again.</p>
        <a href="/checkout" className="mt-6 inline-block text-blue-600 underline">
          Go Back to Checkout
        </a>
      </div>
    );
  }
  