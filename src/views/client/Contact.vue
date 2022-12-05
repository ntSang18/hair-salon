<template>
  <div>
    <section id="page-header">
      <div class="header-content">
        <div class="header-content">
          <h2>Contact Us</h2>
          <p>We love hear from you</p>
        </div>
      </div>
    </section>

    <section id="contact" class="section-p1">
      <div class="contact-detail">
        <h2>Contact Info</h2>
        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p>
        <div class="contact-line">
          <img src="@/assets/client/images/logo/home2.png" />
          <div>
            <h5>Address Location</h5>
            <span>54 Nguyen Luong Bang, Hoa Khanh Bac, Lien Chieu, Da Nang</span>
          </div>
        </div>
        <div class="contact-line">
          <img src="@/assets/client/images/logo/phone2.png" />
          <div>
            <h5>Phone Number</h5>
            <span>0777908037</span>
          </div>
        </div>
        <div class="contact-line">
          <img src="@/assets/client/images/logo/gmail2.png" />
          <div>
            <h5>Email Address</h5>
            <span>thanhsang6325@gmail.com</span>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d930.8874854112767!2d105.8047464!3d21.0506866!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1662966864754!5m2!1svi!2s"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>

    <section id="message" class="section-p1">
      <form action="">
        <div class="row">
          <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Your Name" />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email Address" />
          </div>
        </div>
        <div class="row">
          <div>
            <label for="subject">Subject</label>
            <input type="text" name="subject" id="subject" placeholder="Message Subject" />
          </div>
        </div>
        <div class="row">
          <div>
            <label for="comment">Comments</label>
            <textarea name="comment" id="comment" cols="30" rows="10" placeholder="Your Message"></textarea>
          </div>
        </div>
      </form>

      <div>
        <h2>Message Us</h2>
        <p>We love hear from you</p>
      </div>
    </section>

    <section id="newsletter">
      <div class="newstext">
        <h4>Sign Up For Newsletters</h4>
        <p>
          Get E-mail updates about our services and
          <span>special offers.</span>
        </p>
      </div>
      <div class="form">
        <input type="text" placeholder="Your email address" />
        <button>Sign up</button>
      </div>
    </section>
  </div>
</template>
<script>
export default {};
</script>
