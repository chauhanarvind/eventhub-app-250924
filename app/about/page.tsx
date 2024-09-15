import React from "react";
import styles from "./page.module.css";

const Page = () => {
  return (
    <main className={styles.container}>
      <section className={styles.section} id="about-us">
        <h1 className={styles.title}>Welcome to EventHub!</h1>
        <p className={styles.paragraph}>
          Born out of the vibrant community of students and residents at the
          University of Waikato in Hamilton, New Zealand, EventHub was created
          with a simple yet powerful vision: to connect people with their
          community and local culture through a unified platform.
        </p>
        <p className={styles.paragraph}>
          When we first arrived in Hamilton, we quickly realized that staying in
          the loop about local events was a challenge. The city was brimming
          with exciting opportunities, but finding out about them often felt
          like a game of chance—relying on word of mouth or stumbling across
          random social media posts. We knew there had to be a better way.
        </p>
        <p className={styles.paragraph}>
          And so, EventHub was born. Our mission is to bring all the incredible
          happenings in Hamilton into one central location. Imagine a place
          where you can effortlessly explore, discover, and participate in the
          rich tapestry of events that make our city so unique. Whether it's a
          concert, festival, workshop, or community gathering, EventHub is your
          go-to source for all things happening in Hamilton.
        </p>
        <p className={styles.paragraph}>
          For event-goers, EventHub offers a streamlined experience to browse
          events, access detailed information, and easily purchase tickets or
          register—all through a single, user-friendly platform. For
          organizations, we provide a powerful tool to enhance your event's
          visibility, reach a larger audience, and boost participation and
          revenue.
        </p>
        <p className={styles.paragraph}>
          At EventHub, we're more than just a platform; we're a community hub
          designed to bring people together and celebrate the vibrant life of
          Hamilton. Join us in making our city’s events more accessible and
          enjoyable for everyone!
        </p>
        <p className={styles.paragraph}>
          <em>
            Experience Hamilton like never before—discover, connect, and
            celebrate with EventHub.
          </em>
        </p>
      </section>

      <section className={styles.section} id="core-values">
        <h2 className={styles.subtitle}>Core Values</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong>Community Connection</strong>: We believe in the power of
            community and strive to create a space that brings people together,
            fostering connections and enriching local culture.
          </li>
          <li className={styles.listItem}>
            <strong>Inclusivity</strong>: We are committed to inclusivity,
            ensuring that our platform serves everyone in Hamilton, regardless
            of their background or interests.
          </li>
          <li className={styles.listItem}>
            <strong>Transparency</strong>: We value transparency in our
            operations and communication, providing clear and accurate
            information to our users and partners.
          </li>
          <li className={styles.listItem}>
            <strong>Innovation</strong>: We embrace innovation to continuously
            improve our platform, offering new and effective ways to engage with
            events and local culture.
          </li>
          <li className={styles.listItem}>
            <strong>Collaboration</strong>: We believe in the strength of
            collaboration, working closely with event organizers and community
            members to create a unified and vibrant event landscape.
          </li>
        </ul>
      </section>

      <section className={styles.section} id="mission-statement">
        <h2 className={styles.subtitle}>Mission Statement</h2>
        <p className={styles.paragraph}>
          At EventHub, our mission is to transform the way Hamilton experiences
          its community events. We are dedicated to creating a centralized
          platform that seamlessly connects residents and visitors with the rich
          array of happenings in our city. By providing a comprehensive,
          user-friendly tool for discovering, participating in, and promoting
          events, we aim to enhance community engagement, foster local culture,
          and support the growth of both events and organizations in Hamilton.
        </p>
      </section>

      <section className={styles.section} id="meet-our-team">
        <h2 className={styles.subtitle}>Meet Our Team</h2>

        <article className={styles.teamMember}>
          <h3 className={styles.teamTitle}>Vraj Patel - General Manager</h3>
          <p className={styles.paragraph}>
            As the General Manager of EventHub, Vraj Patel is the driving force
            behind our day-to-day operations. With a keen eye for detail and a
            passion for community engagement, Vraj ensures that our platform
            runs smoothly and efficiently. His dedication to excellence and his
            deep understanding of local dynamics make him the perfect leader to
            oversee the growth and success of EventHub.
          </p>
        </article>

        <article className={styles.teamMember}>
          <h3 className={styles.teamTitle}>Munaz Jahan - CEO</h3>
          <p className={styles.paragraph}>
            Munaz Jahan, our visionary CEO, is the heart and soul of EventHub.
            With a strong background in strategic planning and a commitment to
            innovation, Munaz leads our team with a clear and ambitious vision.
            Her leadership is fueled by a desire to make Hamilton’s events more
            accessible and engaging, and her expertise drives the strategic
            direction of our company.
          </p>
        </article>

        <article className={styles.teamMember}>
          <h3 className={styles.teamTitle}>Arvind Chauhan - CTO</h3>
          <p className={styles.paragraph}>
            As Chief Technology Officer, Arvind Chauhan is the technical
            mastermind behind EventHub. His extensive experience in technology
            and software development ensures that our platform remains
            cutting-edge and user-friendly. Arvind’s passion for technology and
            innovation plays a crucial role in shaping the future of EventHub
            and enhancing the user experience.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Page;
