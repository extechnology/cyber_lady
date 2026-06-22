import { useState } from "react";
import { motion } from "motion/react";

import { Breadcrumbs } from "../components/site/Breadcrumbs";
import { Reveal } from "../components/site/Reveal";


export default function Contact() {
  const [sent, setSent] = useState(false);
  // const [formData,setFormData] = useState({
  //   name: "",
  //   email: "",
  //   subject: "",
  //   message: "",
  // })
  // const handleInputChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // }

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-10"
            >
              <Field label="Your name" name="name"  />
              <Field label="Email" name="email" type="email" />
              <Field
                label="Subject"
                name="subject"
                placeholder="Styling, repair, bespoke…"
              />
              <Field label="Message" name="message" textarea />

              <div className="flex flex-col items-start gap-6 pt-2">
                <button
                  type="submit"
                  disabled={sent}
                  className="group inline-flex items-center gap-3 bg-ink px-8 py-5 text-[11px] uppercase tracking-[0.3em] text-cream transition-colors hover:bg-accent disabled:opacity-50"
                >
                  {sent ? "Message sent ✓" : "Send message"}
                  {!sent && (
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
                {sent && (
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

function Field({
  label,
  name,
  type = "text",
  textarea,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
}) {
  const common =
    "w-full border-0 border-b border-border bg-transparent pb-3 pt-2 text-base placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors";
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <div className="mt-3">
        {textarea ? (
          <textarea
            name={name}
            rows={4}
            placeholder={placeholder}
            className={common}
            required
          />
        ) : (
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={common}
            required
          />
        )}
      </div>
    </label>
  );
}
