export const legalUpdated = 'October 2026'

export const privacyDocument: LegalDocument = {
  eyebrow: 'Legal',
  title: 'Privacy policy',
  lead: 'How MAP handles personal information collected through this website and through an enquiry.',
  pathname: '/legal/privacy',
  intro:
    'MAP Media Art Production produces film and broadcast programmes from Dubai Production City. This policy describes the personal information the website receives, and how that information is used.',
  sections: [
    {
      id: 'who',
      title: 'Who this policy covers',
      paragraphs: [
        'This policy applies to maproduction.ae, to enquiries sent through the site, and to an account used to sign in. A production, a broadcast, or an equipment hire may also be covered by the written agreement for that engagement.',
      ],
    },
    {
      id: 'collect',
      title: 'Information we collect',
      paragraphs: [
        'When you send an enquiry or request a proposal, we receive the details you submit: your name, organisation, email address, telephone number, and the content of the message.',
        'If you sign in, we keep the account information required to recognise you. The site also records technical information, such as browser type, device, and IP address, in server logs used to operate and secure the site.',
      ],
    },
    {
      id: 'use',
      title: 'How information is used',
      paragraphs: [
        'Enquiry details are used to reply, to prepare a proposal, and to plan a production or a hire. Account information is used to operate the sign-in. Technical information is used to keep the site available and to understand how it is used.',
      ],
    },
    {
      id: 'sharing',
      title: 'Who receives it',
      paragraphs: [
        'Information is shared with the providers who host the website and deliver email, and with analytics providers when those tools are enabled. MAP does not sell personal information.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and analytics',
      paragraphs: [
        'A cookie is stored when you sign in, so the session can continue. Analytics and advertising tags may run when they are enabled for the site. You can control cookies in your browser.',
      ],
    },
    {
      id: 'retention',
      title: 'How long it is kept',
      paragraphs: [
        'Enquiry and account information is kept for the life of the enquiry or the engagement, and for any further period required by the law of the United Arab Emirates.',
      ],
    },
    {
      id: 'requests',
      title: 'Access, correction, and deletion',
      paragraphs: [
        'You may ask for a copy of the personal information you have sent, a correction, or deletion. Write to info@maproduction.ae. We will respond by email.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      paragraphs: [
        'MAP may update this policy. The date at the top of the page is the date of the current version.',
      ],
    },
  ],
}

export const termsDocument: LegalDocument = {
  eyebrow: 'Legal',
  title: 'Terms of service',
  lead: 'The terms that apply when you use this website. A production is governed by its own proposal.',
  pathname: '/legal/terms',
  intro:
    'These terms apply to your use of the MAP Media Art Production website. By using the site, you agree to them. A production, a broadcast, or an equipment hire is governed by the written proposal or contract for that engagement.',
  sections: [
    {
      id: 'site',
      title: 'The website',
      paragraphs: [
        'The site describes MAP’s services, equipment, and broadcast units. Descriptions are provided for information. Availability, specifications, and fees are confirmed in a proposal.',
      ],
    },
    {
      id: 'proposals',
      title: 'Enquiries and proposals',
      paragraphs: [
        'A proposal names the crew, the schedule, and the fee for the scope it covers. Work begins when that proposal is accepted in writing. A date is held once it has been confirmed.',
      ],
    },
    {
      id: 'use',
      title: 'Use of the site',
      paragraphs: [
        'Use the site for lawful purposes. Do not attempt to disrupt the site, to access another person’s account, or to submit information you are not entitled to send.',
      ],
    },
    {
      id: 'accounts',
      title: 'Accounts',
      paragraphs: [
        'A signed-in account is for the person it was issued to. Keep the sign-in details confidential, and tell MAP if you believe they have been used by someone else.',
      ],
    },
    {
      id: 'ip',
      title: 'Intellectual property',
      paragraphs: [
        'Text, photographs, the MAP name, and the design of this site belong to MAP Media Art Production or its licensors. A delivered film or recording belongs to the client on the terms of the engagement.',
      ],
    },
    {
      id: 'liability',
      title: 'Liability',
      paragraphs: [
        'The website is provided for information. Responsibility for a production is set out in the engagement. Liability arising from use of the website is limited to the extent permitted by the law of the United Arab Emirates.',
      ],
    },
    {
      id: 'law',
      title: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of the United Arab Emirates. The courts of Dubai have jurisdiction.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      paragraphs: [
        'MAP may update these terms. The date at the top of the page is the date of the current version. Use of the site after that date is acceptance of the updated terms.',
      ],
    },
  ],
}

export interface LegalDocument {
  eyebrow: string
  title: string
  lead: string
  pathname: string
  intro: string
  sections: { id: string; title: string; paragraphs: string[] }[]
}
