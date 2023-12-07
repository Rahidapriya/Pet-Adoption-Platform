import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../components/providers/AuthProvider";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://serversite-pet-adoption.vercel.app/adddonationcamp`)
      .then(response => response.json())
      .then(data => {
        const activeDonation = data.find(donation => donation._id == id);
        setDonation(activeDonation);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch(error => {
        console.error("Error fetching pets Category:", error);
        setLoading(false); // Set loading to false on error
      });
  }, []);
  console.log('activedonation', donation);
  const [values, setValues] = useState({
    donationAmount: 0,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  console.log('donationnnnn', donation);
  useEffect(() => {
    if (donation) {
      axiosSecure.post('/create-payment-intent', {
        donationAmount: values.donationAmount,
        image: donation.image,
        name: donation.shortdesp,
        ownerEmail: donation.userEmail
      })
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, values.donationAmount, donation]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('payment error', error);
      setError(error.message);
    } else {
      console.log('payment method', paymentMethod);
      setError('');
    }

    if (donation) {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          }
        }
      });

      if (confirmError) {
        console.log('confirm error');
      } else {
        console.log('payment intent', paymentIntent);
        if (paymentIntent.status === 'succeeded') {
          console.log('transaction id', paymentIntent.id);
          setTransactionId(paymentIntent.id);
          const payment = {
            email: user.email,
            image: donation.image,
            name: donation.name,
            donationId: donation._id,
            donationAmount: values.donationAmount,
            transactionId: paymentIntent.id,
            ownerEmail: donation.userEmail,

            max_donation_limit: donation.max_donation_limit,
            date: new Date(),
            status: 'pending'
          };
          console.log('paymentsssss', payment);

          const res = await axiosSecure.post('/payments', payment);
          console.log('payment saved', res.data);

          if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Thank you for the taka paisa',
              showConfirmButton: false,
              timer: 1500
            });
            // navigate('/dashboard/paymentHistory');
          }
        }
      }
    }
  }

  if (loading) {
    // Render a loading spinner or message while fetching data
    return <p>Loading...</p>;
  }

  if (donation.pause) {
    // Render a message or some UI indicating that donations are currently paused
    return <p>Donations are currently paused.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div htmlFor='max_donation_limit' className="mb-5">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Donation Amount
        </label>
        <input
          type="number"
          name="donationAmount"
          id="donationAmount"
          placeholder="Donation Amount"
          value={values.donationAmount}
          onChange={handleChange}
          min="1"
          className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret || donation?.pause}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
