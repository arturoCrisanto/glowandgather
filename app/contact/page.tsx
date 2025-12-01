"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { playfairFont } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

function ContactPage() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("product");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: productName ? `Product Inquiry: ${productName}` : "",
    message: productName
      ? `I would like to inquire about the ${productName}.\n\n`
      : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeCopy, setSubscribeCopy] = useState(false);

  useEffect(() => {
    if (productName) {
      setFormData({
        name: "",
        email: "",
        subject: `Product Inquiry: ${productName}`,
        message: `I would like to inquire about the ${productName}.\n\n`,
      });
    }
  }, [productName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent. We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubscribeCopy(false);
      } else {
        toast.error("We couldn't send your message. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 px-4 md:px-8 bg-linear-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-4"
            style={playfairFont}
          >
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {productName ? (
              <>
                Interested in <span className="font-semibold text-primary">{productName}</span>? 
                Fill out the form below to place an order or ask any questions.
              </>
            ) : (
              <>
                Have questions or feedback? We'd love to hear from you. Fill out the
                form below and we'll respond as soon as possible.
              </>
            )}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl">
            <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
              </div>

              {/* Email Input */}
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
              </div>

              {/* Subject Input */}
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Product inquiry" />
              </div>

              {/* Message Textarea */}
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell us how we can help you..." />
              </div>

              {/* Options */}
              <div className="flex items-center gap-2">
                <Checkbox id="copy" checked={subscribeCopy} onCheckedChange={(v) => setSubscribeCopy(Boolean(v))} />
                <Label htmlFor="copy">Email me a copy</Label>
              </div>

              {/* Submit Button */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" disabled={isSubmitting} className="w-full" style={playfairFont}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>We’ll reply within 1-2 business days</TooltipContent>
                </Tooltip>
              </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="py-6 text-center">
              <div className="text-primary mb-2">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-muted-foreground">hello@glowandgather.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-6 text-center">
              <div className="text-primary mb-2">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-6 text-center">
              <div className="text-primary mb-2">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Hours</h3>
              <p className="text-muted-foreground">Mon-Fri: 9AM - 6PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
