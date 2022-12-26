function Contact() {
  return (
    <div>
      <div id="title" className="mt-8 text-center text-2xl font-bold">
        Let's connect!
      </div>
      <br />
      <p className="italic text-center my-32">
        "The best things in life are unexpected, because there were no
        expectations." -Eli Khamarov
      </p>
      <br />
      <p className="mx-auto w-fit font-bold">
        Send me an email or a message on LinkedIn!
      </p>
      <br />
      <div id="contactContainer" className="mx-auto w-fit">
        <p>
          <a
            href="https://www.linkedin.com/in/noahh-kim"
            className="text-blue-500 underline"
          >
            LinkedIn
          </a>
          <span> | </span>
          <span>noahhkim@yahoo.com</span>
        </p>
      </div>
    </div>
  );
}

export default Contact;
