import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import Fox from '../models/Fox';
import useAlert from '../hooks/useAlert';
import GlitchPageLayout from '../components/GlitchPageLayout';

/**
 * Contact page: EmailJS form + animated Fox. Requires Vite EmailJS env vars.
 *
 * @returns {JSX.Element}
 */
const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const { alert, showAlert, hideAlert } = useAlert();

  /**
   * Syncs controlled form fields with input changes.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e
   */
  const changes = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /** Plays an attentive fox animation while a field is focused. */
  const focus = () => setCurrentAnimation('Take 001');

  /** Returns the fox to a static pose when a field blurs. */
  const blur = () => setCurrentAnimation('Static Pose');

  /**
   * Sends the message via EmailJS and shows a success/error alert.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const submit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Ritika',
          from_email: form.email,
          to_email: 'ritikatheeng2002@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        showAlert({ show: true, text: 'Your message was sent successfully.', type: 'success' });
        setTimeout(() => {
          hideAlert();
          setCurrentAnimation('idle');
          setForm({ name: '', email: '', message: '' });
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setCurrentAnimation('Static Pose');
        console.log(error);
        showAlert({
          show: true,
          text: 'Sorry, your message was not sent. Please try again.',
          type: 'danger',
        });
      });
  };

  return (
    <GlitchPageLayout fullWidth>
      {alert.show && <Alert {...alert} />}
      <motion.div
        className="flex flex-col gap-10 lg:flex-row lg:gap-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-white sm:text-5xl">
            Contact{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-300 via-yellow-300 to-teal-300 bg-clip-text">Me</span>
          </h1>
          <p className="mt-3 text-gray-100">Have a question or want to collaborate? Send a message.</p>

          <form className="flex flex-col w-full gap-6 mt-10" onSubmit={submit} ref={formRef}>
            <label className="text-lg font-semibold text-slate-200">
              Your Name
              <input
                type="text"
                name="name"
                className="input mt-2 !bg-white/95 !text-slate-900"
                placeholder="Enter Your Name"
                value={form.name}
                onChange={changes}
                onFocus={focus}
                onBlur={blur}
              />
            </label>
            <label className="text-lg font-semibold text-slate-200">
              Your Email
              <input
                type="email"
                name="email"
                className="input mt-2 !bg-white/95 !text-slate-900"
                placeholder="Enter Your Email"
                value={form.email}
                required
                onChange={changes}
                onFocus={focus}
                onBlur={blur}
              />
            </label>
            <label className="text-lg font-semibold text-slate-200">
              Write a Message
              <textarea
                name="message"
                className="textarea mt-2 !bg-white/95 !text-slate-900"
                placeholder="Type Something..."
                value={form.message}
                rows={8}
                required
                onChange={changes}
                onFocus={focus}
                onBlur={blur}
              />
            </label>
            <button
              type="submit"
              className="btn w-full max-w-md !from-emerald-600 !to-teal-600 hover:opacity-90"
              disabled={isLoading}
              onFocus={focus}
              onBlur={blur}
            >
              {isLoading ? 'Sending your message...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="h-[400px] w-full shrink-0 overflow-hidden rounded-2xl lg:h-auto lg:min-h-[480px] lg:w-[42%]">
          <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
            <directionalLight intensity={2.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0, -1, 0]}
                rotation={[0.35, -0.03, 0]}
                scale={[8, 8, 8]}
              />
            </Suspense>
          </Canvas>
        </div>
      </motion.div>
    </GlitchPageLayout>
  );
};

export default Contact;
