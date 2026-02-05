import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { ChevronRight, FileText, Lock, Globe, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    const lastUpdated = "February 05, 2026";
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [
        { id: 'section-1', label: '1. Information Collection' },
        { id: 'section-2', label: '2. Information Processing' },
        { id: 'section-3', label: '3. Legal Bases' },
        { id: 'section-4', label: '4. Sharing Data' },
        { id: 'section-5', label: '5. Cookies & Tracking' },
        { id: 'section-6', label: '6. Data Retention' },
        { id: 'section-7', label: '7. Data Security' },
        { id: 'section-8', label: '8. Minors' },
        { id: 'section-9', label: '9. Privacy Rights' },
        { id: 'section-10', label: '10. Do-Not-Track' },
        { id: 'section-11', label: '11. US Resident Rights' },
        { id: 'section-12', label: '12. Updates' },
        { id: 'section-13', label: '13. Contact Us' },
        { id: 'section-14', label: '14. Review/Delete Data' },
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-500 selection:text-white">
            <SEO
                pageName="privacy-policy"
                fallbackTitle="Privacy Policy - InkTrix"
                fallbackDesc="Read the InkTrix Privacy Policy to understand how we handle your data."
            />

            {/* --- SIMPLE HEADER --- */}
            <header className="bg-slate-50 border-b border-slate-200 pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
                        <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span>Privacy Policy</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-slate-500 text-sm font-medium">Last updated: {lastUpdated}</p>
                </div>
            </header>

            {/* --- CONTENT LAYOUT --- */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- SIDE NAVIGATION --- */}
                    <aside className="lg:w-1/4">
                        <div className="sticky top-32 bg-white border border-slate-200 rounded-xl p-6 hidden lg:block">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <FileText size={16} className="text-brand-600" /> Navigation
                            </h3>
                            <nav className="space-y-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`block text-left w-full text-xs py-2 px-3 rounded-lg transition-all ${activeSection === item.id
                                            ? 'bg-brand-50 text-brand-700 font-bold'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* --- MAIN CONTENT --- */}
                    <main className="lg:w-3/4">
                        <div className="prose prose-slate max-w-none 
                            prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                            prose-p:text-slate-600 prose-p:leading-relaxed
                            prose-strong:text-slate-900 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
                            [&>section]:mb-16"
                        >
                            <p className="text-lg text-slate-700 mb-6">
                                This Privacy Notice for InkTrix ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
                            </p>

                            <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-10">
                                <li>Visit our website at <a href="https://inktrix.shop">https://inktrix.shop</a> or any website of ours that links to this Privacy Notice</li>
                                <li>Use Inktrix. At InkTrix, we’re passionate about providing high-quality ink and printer solutions that keep your world printing smoothly. From everyday home use to professional office needs, we offer a wide range of compatible inks, toners, and accessories designed for performance and value.</li>
                                <li>Engage with us in other related ways, including any marketing or events</li>
                            </ul>

                            <p className="text-slate-600 mb-10">
                                Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at
                                Inktrixshop@outlook.com.
                            </p>

                            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl mb-12">
                                <h3 className="mt-0 text-slate-900 font-bold">SUMMARY OF KEY POINTS</h3>
                                <p className="text-sm text-slate-500 mb-6 italic">This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</p>
                                <div className="grid gap-4 text-sm">
                                    <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information you disclose to us.</p>
                                    <p><strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.</p>
                                    <p><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</p>
                                    <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.</p>
                                    <p><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about when and with whom we share your personal information.</p>
                                    <p><strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.</p>
                                    <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.</p>
                                    <p><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</p>
                                    <p>Want to learn more about what we do with any information we collect? Review the Privacy Notice in full.</p>
                                </div>
                            </div>

                            <section id="section-1">
                                <h2 className="text-2xl pt-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
                                <p className="font-bold">Personal information you disclose to us</p>
                                <p className="text-slate-500 italic">In Short: We collect personal information that you provide to us.</p>
                                <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                                <p><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                                <ul className="list-none pl-0 grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                    {['names', 'phone numbers', 'email addresses', 'billing addresses', 'debit/credit card numbers'].map(item => (
                                        <li key={item} className="bg-slate-50 px-4 py-2 border border-slate-100 rounded text-sm capitalize">• {item}</li>
                                    ))}
                                </ul>
                                <p className="mt-6"><strong>Sensitive Information.</strong> We do not process sensitive information.</p>
                                <p><strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by PayPal, Visa and Master Card. You may find their privacy notice link(s) here:</p>
                                <ul className="list-disc pl-5">
                                    <li><a href="https://www.paypal.com/us/legalhub/paypal/privacy-full">https://www.paypal.com/us/legalhub/paypal/privacy-full</a></li>
                                    <li><a href="https://www.visa.co.in/legal/global-privacy-notice.html">https://www.visa.co.in/legal/global-privacy-notice.html</a></li>
                                    <li><a href="https://www.mastercard.com/us/en/global-privacy-notice.html">https://www.mastercard.com/us/en/global-privacy-notice.html</a></li>
                                </ul>
                                <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
                            </section>

                            <section id="section-2">
                                <h2 className="text-2xl pt-4">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                                <p className="text-slate-500 italic">In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.</p>
                                <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                                    <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
                                </ul>
                            </section>

                            <section id="section-3">
                                <h2 className="text-2xl pt-4">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</h2>
                                <p className="text-slate-500 italic">In Short: We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</p>
                                <p className="text-xs font-bold bg-slate-100 p-2 inline-block rounded mb-4">If you are located in Canada, this section applies to you.</p>
                                <p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.</p>
                                <p>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                                    <li>For investigations and fraud detection and prevention</li>
                                    <li>For business transactions provided certain conditions are met</li>
                                    <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                                    <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
                                    <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                                    <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
                                    <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                                    <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                                    <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                                    <li>If the information is publicly available and is specified by the regulations</li>
                                    <li>We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments</li>
                                </ul>
                            </section>

                            <section id="section-4">
                                <h2 className="text-2xl pt-4">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                                <p className="text-slate-500 italic">In Short: We may share information in specific situations described in this section and/or with the following third parties.</p>
                                <p>We may need to share your personal information in the following situations:</p>
                                <p><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p>
                            </section>

                            <section id="section-5">
                                <h2 className="text-2xl pt-4">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
                                <p className="text-slate-500 italic">In Short: We may use cookies and other tracking technologies to collect and store your information.</p>
                                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>
                                <p>We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.</p>
                                <p>To the extent these online tracking technologies are deemed to be a "sale"/"sharing" (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?"</p>
                                <p>Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
                                <p><strong>Google Analytics</strong></p>
                                <p>We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: Google Analytics Demographics and Interests Reporting. To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a>. You can opt out of Google Analytics Advertising Features through Ads Settings and Ad Settings for mobile apps. Other opt out means include <a href="http://optout.networkadvertising.org/">http://optout.networkadvertising.org/</a> and <a href="http://www.networkadvertising.org/mobile-choice">http://www.networkadvertising.org/mobile-choice</a>. For more information on the privacy practices of Google, please visit the Google Privacy & Terms page.</p>
                            </section>

                            <section id="section-6">
                                <h2 className="text-2xl pt-4">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                                <p className="text-slate-500 italic">In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
                                <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
                                <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
                            </section>

                            <section id="section-7">
                                <h2 className="text-2xl pt-4">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                                <p className="text-slate-500 italic">In Short: We aim to protect your personal information through a system of organizational and technical security measures.</p>
                                <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
                            </section>

                            <section id="section-8">
                                <h2 className="text-2xl pt-4">8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
                                <p className="text-slate-500 italic">In Short: We do not knowingly collect data from or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction.</p>
                                <p>We do not knowingly collect, solicit data from, or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or the equivalent age as specified by law in your jurisdiction or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age or the equivalent age as specified by law in your jurisdiction has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18 or the equivalent age as specified by law in your jurisdiction, please contact us at
                                    Inktrixshop@outlook.com.</p>
                            </section>

                            <section id="section-9">
                                <h2 className="text-2xl pt-4">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                                <p className="text-slate-500 italic">In Short: Depending on your state of residence in the US or in some regions, such as Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>
                                <p>In some regions (like Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. If a decision that produces legal or similarly significant effects is made solely by automated means, we will inform you, explain the main factors, and offer a simple way to request human review. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.</p>
                                <p>We will consider and act upon any request in accordance with applicable data protection laws.</p>
                                <p><strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.</p>
                                <p>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
                                <p><strong>Account Information</strong></p>
                                <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
                                <ul className="list-disc pl-5">
                                    <li>Contact us using the contact information provided.</li>
                                </ul>
                                <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>
                                <p>If you have questions or comments about your privacy rights, you may email us at
                                    Inktrixshop@outlook.com.</p>
                            </section>

                            <section id="section-10">
                                <h2 className="text-2xl pt-4">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                                <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.</p>
                                <p>California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.</p>
                            </section>

                            <section id="section-11">
                                <h2 className="text-2xl pt-4">11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
                                <p className="text-slate-500 italic">In Short: If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.</p>

                                <p className="font-bold">Categories of Personal Information We Collect</p>
                                <p>The table below shows the categories of personal information we have collected in the past twelve (12) months. The table includes illustrative examples of each category and does not reflect the personal information we collect from you. For a comprehensive inventory of all personal information we process, please refer to the section "WHAT INFORMATION DO WE COLLECT?"</p>

                                <div className="border border-slate-200 rounded-lg overflow-hidden mt-6 mb-6">
                                    <table className="min-w-full text-sm text-left">
                                        <thead className="bg-slate-50 font-bold border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-3 w-1/3">Category</th>
                                                <th className="px-6 py-3 w-1/2">Examples</th>
                                                <th className="px-6 py-3">Collected</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr><td className="px-6 py-3">A. Identifiers</td><td className="px-6 py-3">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">B. Personal Information (California Statute)</td><td className="px-6 py-3">Name, contact information, education, employment, employment history, and financial information</td><td className="px-6 py-3 text-brand-600 font-bold">YES</td></tr>
                                            <tr><td className="px-6 py-3">C. Protected Characteristics</td><td className="px-6 py-3">Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">D. Commercial Information</td><td className="px-6 py-3">Transaction information, purchase history, financial details, and payment information</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">E. Biometric Information</td><td className="px-6 py-3">Fingerprints and voiceprints</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">F. Internet or Network Activity</td><td className="px-6 py-3">Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">G. Geolocation Data</td><td className="px-6 py-3">Device location</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">H. Audio, Sensory Information</td><td className="px-6 py-3">Images and audio, video or call recordings created in connection with our business activities</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">I. Professional Information</td><td className="px-6 py-3">Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">J. Education Information</td><td className="px-6 py-3">Student records and directory information</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">K. Inferences</td><td className="px-6 py-3">Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics</td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                            <tr><td className="px-6 py-3">L. Sensitive Personal Information</td><td className="px-6 py-3"></td><td className="px-6 py-3 text-slate-400 font-bold">NO</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p>We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Receiving help through our customer support channels;</li>
                                    <li>Participation in customer surveys or contests; and</li>
                                    <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
                                </ul>
                                <p>We will use and retain the collected personal information as needed to provide the Services or for:</p>
                                <p>Category B - As long as the user has an account with us</p>
                                <p><strong>Sources of Personal Information</strong></p>
                                <p>Learn more about the sources of personal information we collect in "WHAT INFORMATION DO WE COLLECT?"</p>
                                <p><strong>How We Use and Share Personal Information</strong></p>
                                <p>Learn more about how we use your personal information in the section, "HOW DO WE PROCESS YOUR INFORMATION?"</p>
                                <p><strong>Will your information be shared with anyone else?</strong></p>
                                <p>We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?"</p>
                                <p>We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.</p>
                                <p>We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.</p>
                                <p><strong>Your Rights</strong></p>
                                <p>You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Right to know whether or not we are processing your personal data</li>
                                    <li>Right to access your personal data</li>
                                    <li>Right to correct inaccuracies in your personal data</li>
                                    <li>Right to request the deletion of your personal data</li>
                                    <li>Right to obtain a copy of the personal data you previously shared with us</li>
                                    <li>Right to non-discrimination for exercising your rights</li>
                                    <li>Right to opt out of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California’s privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")</li>
                                </ul>
                                <p>Depending upon the state where you live, you may also have the following rights:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Right to access the categories of personal data being processed (as permitted by applicable law, including the privacy law in Minnesota)</li>
                                    <li>Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in California, Delaware, and Maryland)</li>
                                    <li>Right to obtain a list of specific third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in Minnesota and Oregon)</li>
                                    <li>Right to obtain a list of third parties to which we have sold personal data (as permitted by applicable law, including the privacy law in Connecticut)</li>
                                    <li>Right to review, understand, question, and depending on where you live, correct how personal data has been profiled (as permitted by applicable law, including the privacy law in Connecticut and Minnesota)</li>
                                    <li>Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including the privacy law in California)</li>
                                    <li>Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature (as permitted by applicable law, including the privacy law in Florida)</li>
                                </ul>
                                <p><strong>How to Exercise Your Rights</strong></p>
                                <p>To exercise these rights, you can contact us by submitting a data subject access request, by emailing us at
                                    Inktrixshop@outlook.com, by calling toll-free at +1-402-448-6127, or by referring to the contact details at the bottom of this document.</p>
                                <p>Under certain US state data protection laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with applicable laws.</p>
                                <p><strong>Request Verification</strong></p>
                                <p>Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.</p>
                                <p>If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.</p>
                                <p><strong>Appeals</strong></p>
                                <p>Under certain US state data protection laws, if we decline to take action regarding your request, you may appeal our decision by emailing us at
                                    Inktrixshop@outlook.com. We will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal is denied, you may submit a complaint to your state attorney general.</p>
                                <p><strong>California "Shine The Light" Law</strong></p>
                                <p>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</p>
                            </section>

                            <section id="section-12">
                                <h2 className="text-2xl pt-4">12. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
                                <p className="text-slate-500 italic">In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
                                <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>
                            </section>

                            <section id="section-13">
                                <h2 className="text-2xl pt-4">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                                <p>If you have questions or comments about this notice, you may email us at
                                    Inktrixshop@outlook.com or contact us by post at:</p>
                                <div className="bg-slate-900 text-slate-100 p-8 rounded-xl flex flex-col md:flex-row gap-8 justify-between mt-6">
                                    <div>
                                        <h4 className="text-white font-bold mb-4">Contact Details</h4>
                                        <div className="space-y-3 text-sm">
                                            <p className="flex items-center gap-2"><Mail size={14} className="text-brand-400" />
                                                Inktrixshop@outlook.com</p>
                                            <p className="flex items-center gap-2"><Phone size={14} className="text-brand-400" /> +1-402-448-6127</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-4">Mailing Address</h4>
                                        <address className="not-italic text-sm text-slate-300">
                                            InkTrix<br />
                                            203 Texas Ave<br />
                                            Round Rock, TX 78664<br />
                                            United States
                                        </address>
                                    </div>
                                </div>
                            </section>

                            <section id="section-14">
                                <h2 className="text-2xl pt-4">14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
                                <p>Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.</p>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;