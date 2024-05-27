import emailjs from "@emailjs/browser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class EmailService {
  constructor() {
    this.customerTemplateId = process.env.REACT_APP_EMAILJS_CUSTOMER_TEMPLATE_ID;
    this.barberTemplateId = process.env.REACT_APP_EMAILJS_BARBER_TEMPLATE_ID;
    this.serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    this.publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs.init(this.publicKey);
  }

  async sendBookingConfirmationEmails(bookingData) {
    try {
      console.log(bookingData);
      const formattedStartTime = dayjs(bookingData.StartTime)
        .utc()
        .format("dddd, MMMM D, YYYY [at] h:mm A");

      const templateParams = {
        customer_name: bookingData.CustomerName,
        customer_email: bookingData.CustomerEmail,
        barber_name: bookingData.BarberName,
        barber_email: bookingData.BarberEmail,
        service_name: bookingData.ServiceTitle,
        service_duration: bookingData.Duration,
        service_price: bookingData.Price,
        booking_date: formattedStartTime,
      };

      await emailjs.send(
        this.serviceId,
        this.customerTemplateId,
        templateParams,
      );
      await emailjs.send(this.serviceId, this.barberTemplateId, templateParams);
      console.log("Emails sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Email sending failed");
    }
  }
}

// singleton instance
const emailService = new EmailService();

export default emailService;
