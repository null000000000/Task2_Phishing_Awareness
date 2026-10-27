Task 2: Phishing Awareness Training

CodeAlpha Cyber Security Internship, Task 2. An interactive web training module that teaches how to recognize phishing emails and fake websites, how attackers use social engineering, and how to respond.

Live demo

Open and try it here: https://snofsdidfvodnvsdnvov.vercel.app/

The page is interactive: you can inspect a simulated email, test any URL in the domain parser, and take the quiz.

How the training works

The learner moves through the page from top to bottom, or jumps to a section from the landing page buttons:

Part	What the learner does
Anatomy and attack vectors	Reads about 6 attack types: email phishing, spear phishing, smishing, vishing, whaling/BEC, and clone/fake sites. Each card has a "View Real Scenario" button that expands a real-life example.
Live interactive inspection	Opens a realistic mail client and clicks 6 hidden red flags (spoofed sender, urgent tone, generic greeting, suspicious link, dangerous attachment, and so on). Each click explains why it is suspicious.
Fake websites and domain anatomy	Learns the right-to-left domain reading rule and uses the Live Domain Parser Sandbox: type any URL, or pick a sample, and the page splits it into protocol, subdomain, registered root domain and top-level domain so the real destination is obvious.
Psychology and historic cases	Studies the 6 psychological triggers attackers use (urgency, fear, authority, greed and curiosity, trust, pretexting) and 4 real breaches: Google/Facebook, Twitter, RSA and Target.
Best practices and response protocol	Gets practical tips and an emergency checklist for what to do after clicking a malicious link.
Quiz and certificate	Answers 8 questions with instant feedback and receives a result at the end.
The right-to-left domain rule

Attackers can copy a website's design exactly, but they cannot fake the registered domain. Read the address from right to left, up to the first single slash:

https://paypal.secure-login.verify-now.ru/account/login

paypal.secure-login is only a subdomain, bait text chosen by the attacker
verify-now.ru is the registered root domain, the place where your data really goes
/account/login is the page on that server

So this link belongs to verify-now.ru, not to PayPal.

Screenshots

Landing page: curriculum overview and statistics Landing page

Module 01: what is phishing and the 6 attack vectors Attack vectors

Module 03: fake websites and the live domain parser Domain parser

Run locally

No installation needed. Download the repository and open index.html in any browser.

Deployment

Hosted on Vercel from a GitHub repository (static site, no build step).

Learning outcomes
Recognize phishing emails, SMS and phone attacks
Tell a real website from a fake one by reading the domain
Understand the psychological tricks behind social engineering
Know the first steps to take after a phishing incident
Tech

HTML, CSS and JavaScript only (single static page).
