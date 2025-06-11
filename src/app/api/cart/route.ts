export async function GET(request: Request) {
  try {
    // Simulate fetching cart data from a database or external API
    const cart = [
      { id: 1, title: 'Producto 1', price: 29.99, quantity: 2 },
      { id: 2, title: 'Producto 2', price: 49.99, quantity: 1 },
    ];

    console.log('Cart fetched successfully:', cart);

    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return new Response('Error fetching cart', { status: 500 });
  }
}