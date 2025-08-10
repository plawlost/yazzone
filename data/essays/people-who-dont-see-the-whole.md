---
title: "The people who don’t see the whole"
publishedAt: "2025-08-10"
summary: "See the whole: map your loops, feed the ones that compound, brake the ones that blow up, and work on the lever that moves everything."
---

<p class="lead-figure">
  <img src="/images/essays/people-who-dont-see-the-whole/cover-flywheel.png" />
</p>

**Hi again. If you are building anything and think you can skip this, you are already the guy I am talking about. If you are not, I am going to make sure you never become him. I’ve learnt these in a couple months:**

**The most expensive mistakes in tech come from people who do not see the whole.** They fix the symptom in front of them and accidentally make the system worse. You can tell who they are because their wins are thin and their fires come back. Systems thinking is the opposite. You learn to see the parts, how they interact, and the loops that make results compound or cancel.

> Here is a concrete story. In 2001, Amazon was not inevitable. Margins were thin, the dot-com crash had just hit, and the company looked fragile. Jeff Bezos and a small group drew a simple diagram that later got called the flywheel. Lower prices lead to more customers. More customers attract more third-party sellers. More sellers increase selection. Better selection improves customer experience. Better experience drives more traffic. More traffic grows volume, which lowers unit costs, which lets you lower prices again. That was it. A few boxes, a few arrows, and a promise that if you push anywhere on that circle, the whole thing spins faster.

<p class="lead-figure">
  <img src="/images/essays/people-who-dont-see-the-whole/amazon-flywheel.jpg" width="620" />
</p>

Most retail executives at the time optimized locally. Negotiate a better supplier discount this quarter. Cut support headcount. Raise shipping fees. Every move had a clear short-term metric and a hidden long-term cost. Amazon did the opposite. They launched Marketplace even though it would compete with their own retail margins, because more sellers thickened the selection node. They launched Prime even though it looked crazy to pre-commit to fast shipping, because reducing friction strengthened the experience node and raised repeat purchase frequency, which increased throughput, which reduced per-unit shipping costs, which justified Prime in the first place. They invested in infrastructure that made every loop tighter. The diagram was not a slogan. It was a map for every decision.

That is *systems thinking in action*. You do not ask what helps this metric today. You ask which action strengthens the loops that make good things keep happening tomorrow.

> A second anecdote, shorter but just as useful. Taiichi Ohno from Toyota put an andon cord on the assembly line. Any worker could stop the line if they saw a defect. Western managers visiting were horrified. Stopping the line kills throughput. Ohno knew the opposite was true. If you let defects flow, you pay the tax forever. If you stop and fix the cause, you reduce variation at the source, which raises quality, which reduces rework, which shortens cycle time, which raises morale, which increases suggestions, which reduces future defects again. It looks slower in the moment and faster over the year. The cord was a physical commitment to attack causes, not symptoms.

<p class="lead-figure">
  <img src="/images/essays/people-who-dont-see-the-whole/andon-cord.png" width="620" />
</p>

> **Systems thinking beats symptom-chasing.** Name the loops, make them visible, strengthen reinforcing loops, and add balancing loops that prevent blowups.

**Both stories share the same pattern.** Name the loops. **Make them visible.** Take actions that strengthen reinforcing loops and remove friction. **Add balancing loops** that prevent blowups. Keep going even when a dashboard says you are down this week.

<div class="callout mt-3 mb-3">
  <p class="text-center font-semibold mt-1 mb-1">Two loops</p>
  <p class="text-center text-sm text-neutral-600 dark:text-neutral-400 mb-2">Reinforcing (compounding) vs balancing (governor)</p>
  <p class="text-center m-0">
    <img src="/images/essays/people-who-dont-see-the-whole/two-loops.png" class="inline-block max-w-[520px] w-full my-1" />
  </p>
</div>

<div class="callout">
  <h3>How to copy this (start small)</h3>
  <ol>
    <li>Draw five boxes: <strong>users</strong>, <strong>product</strong>, <strong>distribution</strong>, <strong>cost structure</strong>, <strong>trust</strong>. Add arrows. Rewrite until every arrow is a mechanism, not a hope.</li>
    <li>Find the reinforcing loop. Label it. Ship the single move that increases its gain most. <strong>Ship that first.</strong></li>
    <li>Hunt the balancing loop (the hidden brake). Name it and install a governor before you floor the gas.</li>
    <li>Favor causes over symptoms. For recurring issues, spend a day on root-cause analysis and write the chain down.</li>
    <li>Replace vanity goals with constraints (e.g., p95 TTFV < 60s). Constraints force systems work.</li>
  </ol>
</div>

You can tell whether a team sees the whole by how they talk. Symptom thinkers talk in tasks and moments. “Ship dark mode.” “Cut CAC.” “Add an LLM wrapper.” System thinkers talk in mechanisms and loops. “Reduce time to habit formation.” “Increase network density among creators in week one.” “Shorten the model improvement loop from 30 days to 7.” It’s literally the same energy, different altitude.

**There are common failure modes.** Local optimization is the big one. You speed up one step and slow the line. You make activation look better by adding incentives that attract the wrong users who churn and tank NPS and raise support load. Another is lag blindness. You push a change and expect instant payoff even though the loop you touched has a 90-day delay. If you do not measure at the right horizon, you will revert to the old behavior that felt faster and was actually slower.

**Here is a practical test.** If you (the lead) vanished for a month, would your system keep compounding or decay by itself. If the answer depends on you pushing every day, congrats. You built a treadmill, not a flywheel. That is still technically a system, but it is powered by willpower rather than a structure. The fix is to move effort from rowing to designing the current. Codify the onboarding, automate the review cycle, create a weekly habit that surfaces real anomalies, and design incentives so people do the right thing *by default*.

**Another test.** Can you explain your product’s compounding in one paragraph at whiteboard level. Not a pitch. A description of how X leads to Y leads to Z, and which part you are strengthening this quarter. If you cannot, you are probably copying features from neighbors and calling it strategy.

Bezos was not a wizard at all. He chose a model that compounding could power, then pruned everything that did not feed the loops. Ohno was not romantic either. He chose to eat small pain now to avoid big pain forever. You can do the same in software, even if you are a very early-stage startup (like us). **Map your loops. Reduce delay at foremost. Remove friction at the highest-leverage arrows.** Install one or two balancing loops to keep the graph from exploding. Then keep going. This will maximize momentum as well.

**So, if you want one action for Monday morning, do this.**  
Bring your core team into a room. Draw your five boxes and arrows. Mark the single arrow whose coefficient, if doubled, would most increase monthly compounding. Commit two sprints to doubling it. Ship only things that touch that arrow. After those sprints, redraw the system. If the diagram does not change, you shipped theater.

**The people who do not see the whole will always look faster at first glance.** They have those clean dashboards and short demos. They also keep stepping on the same rakes. The people who see the whole look slower at the start because they do real carpentry and set the joints. Then the curve bends with time. If you stay with the loops long enough, the work starts helping you back, it really does.

**That is what the great skill of systems thinking buys you.**  
*Not a clever diagram. A. freaking. slope.*
