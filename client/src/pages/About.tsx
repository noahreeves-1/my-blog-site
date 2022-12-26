function About(): JSX.Element {
  return (
    <div id="aboutMeWrapper" className="mx-auto max-w-xl">
      <h1 className="my-8 text-center text-2xl font-bold">
        A little about me...
      </h1>
      <div id="aboutMeContainer">
        <p className="text-slate-700 mt-4">
          Thanks so much for visiting my blog! This is my very first TypeScript
          project. <br /> <br />I built the front-end with React and the
          back-end with Express and MongoDB. This application uses PassportJS &
          JSON Web Tokens (JWT) for authentication with validations on both the
          client-side and server-side. <br />
          <br />
          So, a little about me... I was born in Korea, and I moved to the
          United States when I was seven. I grew up in Southern California and
          attended Southern Methodist University in Dallas, Texas. I completed
          my Bachelor of Business Admnistration in Marketing, with a minor in
          economics, and also received my Master of Science in Business
          Analytics. <br />
          <br />
          After graduating from my Master's program, I worked at Accenture,
          where I had an amazing time with some really smart people. I worked on
          10 projects for some of the largest companies in the world. My
          projects primarily revolved around data management, data analytics,
          and robotic process automation (RPA). After five years, I knew my time
          for me to move on was overdue. So, I quit my job, moved back to
          California, and started learning how to code. <br />
          <br />
          Between 2022 and 2023, I visited 7 countries in Southeast Asia, which
          were Cambodia, Thailand, Malaysia, Laos, Vietnam, Philippines, and
          South Korea. I am Korean, but maybe to your surprise, I had the best
          time in Thailand.
        </p>
      </div>
    </div>
  );
}

export default About;
