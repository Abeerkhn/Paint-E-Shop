import React from "react";
import Layout from "./../components/Layout/Layout";
import FullWidthVideo from "../components/calculator/AboutVideo";
const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <FullWidthVideo />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "70px",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            marginTop: "50px",
          }}
        >
          About Us
        </h1>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/walpaper_4.jpg"
              alt="contactus"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="col-md-4">
            <p className="text-justify mt-2">
              Absolutely! Here's an expanded version for the "Mas Paints" about
              page: Welcome to Mas Paints, your haven for colors and creative
              expressions! Nestled at the intersection of artistry and
              innovation, Mas Paints stands as a beacon for those seeking to
              infuse their world with vibrancy and personality.
              <br />
              Our journey began with a simple yet powerful belief: that every
              surface is a canvas, waiting to be adorned with the hues of
              imagination. With this vision in mind, Mas Paints has evolved into
              a sanctuary for enthusiasts, professionals, and homeowners alike,
              offering an unmatched array of paints, tools, and expertise.
              <br />
              <i>
                At Mas Paints, the journey of painting transcends the act of
                applying colors; it's an exploration of emotions, an infusion of
                character, and a celebration of self-expression. We understand
                the transformative power of color, and our extensive palette
                reflects this understanding, curated to inspire and enhance any
                space.
              </i>{" "}
            </p>
          </div>
        </div>
        <div className="row contactus ">
          <div className="col-md-4">
            <p className="text-justify mt-2">
              Our diverse collection spans across traditional favorites,
              contemporary trends, and bespoke creations, ensuring that every
              stroke of your brush reflects your unique style. Quality and
              innovation are the pillars of our offerings, assuring you of paint
              products that are not only aesthetically superior but also
              environmentally conscious.
            </p>
          </div>
          <div className="col-md-6 ">
            <img
              src="/images/about_1.jpg"
              alt="contactus"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/walpaper_2.jpg"
              alt="contactus"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="col-md-4">
            <p className="text-justify mt-2">
              Guiding you through your painting venture is our dedicated team of
              professionals, committed to elevating your creative journey. From
              advising on color choices to imparting expert tips and techniques,
              our experts are here to turn your vision into a masterpiece.
              <br />
              <br />
              Environmental responsibility is integral to Mas Paints's
              philosophy. We are proud to offer an extensive range of
              eco-friendly paints that minimize our ecological footprint without
              compromising on quality or vibrancy.
              <br />
              More than just a paint store, Mas Paints is a community hub,
              fostering connections, and inspiring collaborations. We host
              workshops, seminars, and events to nurture a thriving community of
              artists, designers, and enthusiasts, sharing knowledge and
              fostering creativity.
            </p>
          </div>
        </div>
        <div className="row contactus ">
          <div className="col-md-4">
            <p className="text-justify mt-2">
              As we reflect on our journey, we remain humbled by the unwavering
              support that you have bestowed upon us. Mas Paints is not just a
              store; it's a canvas onto which each of you has left an indelible
              mark, painting stories of inspiration, passion, and creativity.
              From the depths of our colors and the core of our creativity, we
              express our deepest gratitude. Thank you for being the driving
              force behind Mas Paints's colorful odyssey. Your support fuels our
              commitment to continue painting the world with inspiration,
              innovation, and the joy of endless possibilities.
              <br />
              <br />
              With immense gratitude,
              <br />
              <br />
              The Mas Paints Family
            </p>
          </div>
          <div className="col-md-6 ">
            <img
              src="/images/walpaper_3.jpg"
              alt="contactus"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
