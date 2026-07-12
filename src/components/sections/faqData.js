/**
 * FAQ copy per DESIGN_SPEC.md §8.5, verbatim. `n` is the page-wide question
 * number (1–14) used for `faq-trigger-{n}` / `faq-panel-{n}` ids per §8.7,
 * and for the shared, cross-category trigger-ref array that Home/End/Arrow
 * key navigation walks (see AccordionItem.jsx).
 */
export const FAQ_CATEGORIES = [
  {
    heading: 'Pricing & Plans',
    questions: [
      {
        n: 1,
        q: 'Do you offer a free trial?',
        a: `Not in the software-trial sense — Anchorpoint isn't a tool you install and click around in. It's a team that audits your workflows and builds agents for you, so there's nothing to "trial" until we've actually looked at your business. What we do offer for free is the same 30-minute Agent Audit call from our homepage: we look at one real workflow together and tell you plainly whether an agent is a fit, before any money changes hands. If you want to go further, the Audit tier itself is a low-commitment way in — a scoped 2-week engagement, $2,800 one-time, with no ongoing contract attached.`,
      },
      {
        n: 2,
        q: 'What happens when my Audit engagement ends?',
        a: `You keep everything. At the end of your 2-week Audit, you get the full workflow audit, the prioritized agent roadmap, and the ROI estimates — plus 30 days of email support to ask questions about it. If you decide to move into Growth or Partner, we carry that work forward instead of starting over. If you decide not to continue, the roadmap is yours to keep or hand to another vendor. Nothing is deleted, and nothing is held back.`,
      },
      {
        n: 3,
        q: 'Can I cancel anytime?',
        a: `Yes. Growth has a 3-month minimum commitment — enough time to actually get an agent live and proven — and after that it's month-to-month; cancel whenever you want with a message to your named contact, no cancellation fee and no retention call. Partner engagements are custom-scoped, so the exact minimum term is set when we scope yours, but the same rule applies: no auto-renewal traps, no surprise fees.`,
      },
      {
        n: 4,
        q: 'Do you offer monthly and annual billing?',
        a: `Growth and Partner both bill monthly by default. If you'd rather pay upfront, we offer annual prepay at roughly 17% off — about two months free — for either tier, with the same terms otherwise. The Audit tier is a one-time $2,800 engagement, so billing cadence doesn't apply there.`,
      },
      {
        n: 5,
        q: 'Can I upgrade or downgrade my plan?',
        a: `Anytime. Moving up — say, from Audit into Growth, or Growth into Partner — takes effect immediately, and we pick up right where your last engagement left off instead of re-starting the audit. Moving down takes effect at the start of your next billing cycle, so you're never charged twice or cut off mid-cycle.`,
      },
      {
        n: 6,
        q: 'Is there a discount for startups or nonprofits?',
        a: `Every Anchorpoint client is already an SMB, so we don't run a separate "startup tier" on top of that — the Audit tier ($2,800 one-time) is already priced to be the low-risk way for a small or early-stage team to start. What we do offer is a Community Impact Rate: verified 501(c)(3) nonprofits get 20% off any Growth engagement. Ask your point of contact about verification.`,
      },
    ],
  },
  {
    heading: 'Data, Security & Integrations',
    questions: [
      {
        n: 7,
        q: 'Does Anchorpoint integrate with the tools we already use?',
        a: `That's the whole design principle — agents run inside your existing stack, not a separate app your team has to remember to open. We regularly integrate with helpdesks (Zendesk, Help Scout, Front), CRMs (HubSpot, Salesforce, Pipedrive), and everyday tools like Slack and Gmail/Outlook. Anything outside that list, we connect through Zapier or a direct webhook during the Design step of onboarding (see How It Works) — and we confirm every integration with you before anything goes live.`,
      },
      {
        n: 8,
        q: 'Where is our data stored, and is it compliant?',
        a: `Your data stays in AWS, in the US East region by default, with an EU-West option available on request if you need data residency for GDPR. We maintain a SOC 2 Type II report available under NDA, and everything is encrypted in transit and at rest. This is also where "no black-box automations" becomes concrete: every agent action is logged, timestamped, and auditable, so you can always see exactly what data an agent touched and why.`,
      },
      {
        n: 9,
        q: 'What if we need to export our data?',
        a: `Ask your named contact or drop a request in your dedicated Slack channel (Growth and Partner tiers) and we'll deliver a full export — workflow configs, agent logs, and roadmap documents — as CSV/JSON within 5 business days. Because agents run inside your own CRM, helpdesk, and inbox rather than a walled-garden platform, the bulk of "your data" never left your systems in the first place. That's the point of "no lock-in contracts": leaving costs you a conversation, not a migration.`,
      },
      {
        n: 10,
        q: 'Do you have an API?',
        a: `Growth includes a read-only reporting API plus webhook notifications for agent activity, so you can pipe agent metrics into your own dashboards. Partner adds full API access — you can trigger and configure agents programmatically — plus dedicated webhook endpoints for your engineering team. The Audit tier doesn't include API access, since it's a one-time engagement with no live agents running yet.`,
      },
    ],
  },
  {
    heading: 'Working With Anchorpoint',
    questions: [
      {
        n: 11,
        q: 'How long until our first agent is live?',
        a: `Most clients see a working pilot agent inside 3–4 weeks of kicking off a Growth engagement: about a week for Discover and Design (see How It Works), then the agent launches in a limited pilot on real tickets, leads, or tasks before we roll it out fully. Timeline shifts with the complexity of what you're automating, but we give you a specific date, in writing, before you sign anything.`,
      },
      {
        n: 12,
        q: 'What happens if an agent gets something wrong?',
        a: `Every agent we design ships with guardrails and an escalation path to a human — that's part of the Design step, not an afterthought. When an agent hits a situation outside its guardrails, it hands off to your team instead of guessing. And because every action is logged (see "Where is our data stored"), we can always trace exactly what happened and tune the agent so it doesn't happen again. If something does go wrong, you call your named contact directly — never a support ticket queue.`,
      },
      {
        n: 13,
        q: 'Do we need in-house technical staff to work with you?',
        a: `No. We built Anchorpoint for operators, not IT departments. Our team designs, builds, and integrates the agents; your team's job is just to tell us where the time is going and sign off on the workflow before we build it. The 2 live training sessions included in Growth are there to get your non-technical staff comfortable running alongside the agent, not to teach anyone to code.`,
      },
      {
        n: 14,
        q: 'Is our industry a good fit for agentic AI?',
        a: `If your team spends real hours on repetitive digital work — answering routine tickets, chasing invoices, qualifying leads, moving data between systems — it's worth a look. We've deployed agents for dental groups, logistics operators, manufacturers, insurance agencies, and home services businesses, which is a wide enough spread that industry alone rarely disqualifies you. The honest answer comes from the free Agent Audit call, where we tell you plainly if the volume and repetition are there to justify it.`,
      },
    ],
  },
];

export const FAQ_TOTAL_QUESTIONS = FAQ_CATEGORIES.reduce(
  (sum, category) => sum + category.questions.length,
  0
);
