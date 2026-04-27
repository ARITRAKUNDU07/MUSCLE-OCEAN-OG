"use client";

interface PaymentButtonProps {
  amount: number;
  planName: string;
}

export default function PaymentButton({ amount, planName }: PaymentButtonProps) {
  const handlePayment = () => {
    // PhonePe payment gateway will be integrated here
    alert("Payment gateway coming soon. Your plan has been noted.");
  };

  return (
    <button 
      type="button" 
      onClick={handlePayment}
      style={{ 
        width: '100%', 
        padding: '15px', 
        background: '#CCFF00', 
        color: '#000', 
        fontWeight: 'bold', 
        border: 'none', 
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.1rem',
        textTransform: 'uppercase',
        marginTop: '15px'
      }}
    >
      Pay Now (₹{amount})
    </button>
  );
}
