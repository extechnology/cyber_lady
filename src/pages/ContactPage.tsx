import { useState } from "react";
import { motion } from "motion/react";

import { Breadcrumbs } from "../components/site/Breadcrumbs";
import { Reveal } from "../components/site/Reveal";
import { useContact } from "../features/contact/hooks/useContact";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function Contact() {
  const { mutate, isPending, isSuccess } = useContact();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      },
    });
  };

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-12 md:pt-16">
        <Breadcrumbs
          items={[{ label: "Cyber Lady", to: "/" }, { label: "Contact" }]}
        />

        <div className="mt-10 border-b border-border pb-10">
          <Reveal>
            <h1 className="display mt-6 text-5xl leading-[0.95] md:text-6xl">
              Write to <span className="italic text-accent">us.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              For personal styling, repairs, custom commissions, or simply to
              say hello. We answer every message within two working days.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-20 md:grid-cols-12 md:px-12 md:py-28">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow">House</p>
            <div className="mt-6 space-y-8 text-sm leading-relaxed">
              <Block
                title="Cyber Lady"
                lines={[
                  "Foryex Footcare Co.",
                  "West Mangad Po",
                  "Kunnamkulam",
                  "Thrissur",
                  "Kerala-India",
                ]}
              />
              {/* <Block
                title="Studio hours"
                lines={[
                  "Monday — Saturday",
                  "10:00 — 18:00 CET",
                  "By appointment",
                ]}
              /> */}
              <Block
                title="Direct"
                lines={["foriyexfootcare@gmail.com", "+91 94479 95173"]}
              />
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-10">
              <Field
                label="Your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />

              <Field
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />

              <Field
                label="Subject"
                name="subject"
                placeholder="Styling, repair, bespoke…"
                value={formData.subject}
                onChange={handleInputChange}
              />

              <Field
                label="Message"
                name="message"
                textarea
                value={formData.message}
                onChange={handleInputChange}
              />

              <div className="flex flex-col items-start gap-6 pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="group inline-flex items-center gap-3 bg-ink px-8 py-5 text-[11px] uppercase tracking-[0.3em] text-cream transition-all duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending
                    ? "Sending..."
                    : isSuccess
                      ? "Message Sent ✓"
                      : "Send Message"}

                  {!isPending && !isSuccess && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-muted-foreground"
                  >
                    Thank you. We'll be in touch shortly.
                  </motion.p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Block({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="mt-3 space-y-1 text-ink">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  textarea,
  placeholder,
}: FieldProps) {
  const common =
    "w-full border-0 border-b border-border bg-transparent pb-3 pt-2 text-base placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none";

  return (
    <label className="block">
      <span className="eyebrow">{label}</span>

      <div className="mt-3">
        {textarea ? (
          <textarea
            name={name}
            rows={5}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={common}
            required
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={common}
            required
          />
        )}
      </div>
    </label>
  );
}