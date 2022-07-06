# fem-memory-game-svelte

This is a solution to the [Memory game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Notes

(Finished July 6th, 2022)

This is the hardest Frontend Mentor project I've worked on thus far, and I suspect it'll keep that distinction for a while to come, even as I look at some higher-difficulty projects. It took me nearly two months and two separate tech stacks to achieve a level of quality I could accept, and I'm still not particularly happy with the final product.

[A live version of the game can be found here](https://amorse-fem-memory.netlify.app/).

This project merits a little explanation, so I've gone a little more in-depth about my experiences this time.

### Initial Goals

Going into it, I had a number of goals laid out for the finished project: intuitive and responsive animations, robust state management, and a careful focus on accessibility. To acheive this, I initially picked a handful of tools I was familiar with: a SolidJS framework, augmented with GSAP for animations, and TypeScript. I’d also been interested in using the XState library in a project, and a matching game seemed like a good use-case for state machines.

It seemed like a good idea at the time.

### The First Roadblock

I quickly found that this stack had too many moving parts. SolidJS and GSAP needed manual integration to work together. Most of my time with XState was spent fighting with its TypeScript support rather than working with its feature set. And on top of everything, I’d neglected to consider my approach to CSS, only opting for CSS modules when I realized I needed to put my stylesheets somewhere.

Over the next couple of days, I learned a *lot* about all of the technology pairings listed above. But I also realized the project would get done faster if I scrapped everything and started over.

### Trying Again

For my second attempt, I went with Svelte. Svelte has built-in support for animations, so I was spared having to think too hard about library integration. It also has support for scoped component classes, which made some of the more technical CSS easier to write. I picked up TailwindCSS to speed things up even further. Because I still hadn’t *completely* learned my lesson, I insisted on keeping XState and Typescript around for the first quarter-or-so of the project, until I finally uninstalled XState and used a simpler home-grown solution in Svelte.

Once I had the right stack in place, most of the project came together pretty quickly.

### Accessibility

For most web pages, accessibility is only an issue if you make it one (say, using poor contrast or updating text content), and even then there are plenty of automated tools to catch mistakes for you. For most widgets, there are usually well-established best practices to follow involving readability and focus management.

But this isn’t a static web page, or even a purely-functional application. It’s a game. Which adds two important requirements to our design spec:

- The game still needs to play according to its rules. If some piece of content (like a token value) is hidden to the player, it needs to be hidden to ATs, too.
- The game still needs to be *fun to play*, regardless of how it ends up being accessed.

When I first put down a11y as a major concern for this project, I had a whole host of gameplay features in mind to implement, like contrast/theming options and move hinting. If I were to implement this as a real-world project instead of as a demo, I would probably consider those requirements. But by this point, the project had already accrued significant technical debt, and I was (once again) coming up on a point where any major change would almost require me to start over.

So, the majority of my focus with accessibility was placed on just those two points. In practice, this meant ensuring the game was keyboard accessible, and doing my best to make the game run intuitively with a screen reader. To be clear, I did not actually *succeed* in doing this. As of this writing, I’m very much a beginner with any accessibility that can’t be enforced by a checklist, and this project posed a ton of questions that I hadn’t even considered before. I could only do my best to answer each of them as they arose.

I performed reasonably well with keyboard accessibility. So far as the game’s components go, all of them mapped fairly cleanly to existing WAI-ARIA interfaces, although I still found myself needing to alter behaviors occasionally to address some other gameplay or accessibility concern.

Screen-reader accessibility was another story entirely. The matching game is such that a button/token does not *have* a label until it’s revealed, and even then the label might be a picture of an animal. The most consistent way of keeping the user apprised of the game state was through use of a `role="log"` region…which, as it turns out, doesn’t work nearly as consistently across ATs as MDN makes it sound.

And this section would ramble on for twice as long if I dug into the problem of *what* to log to the player — maybe I just don’t have the practice for it, but “value 6 at row 3 column 2” doesn’t exactly lodge itself in my memory. The multiplayer version’s “player 2 selected value 6 at row 3 column 2” is even worse. It’s *accessible*, I guess, but it doesn’t solve the problem of fun.

A particularly patient player could probably play through at least one single-player game using a screen reader. On Chrome. That’s the strongest statement I’m willing to make here.

### Conclusion

Well, *that* was humbling. I learned two big lessons from this project, though. The first being that Javascript libraries are not exactly Legos — not all tools work together seamlessly, no matter how much you like them individually. The second thing I learned was to plan for non-trivial accessibility concerns in the planning stage, rather than saving them for some final enhancement step. Furthermore, I should account for the fact that all the testing these features need requires *time*, and my schedule needs to account for that.
