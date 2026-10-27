"use client";

// Adapted from Ashutoshx7/Portfolio-v2- social-hover-card. Profile data is
// deliberately curated: no invented followers, verification badge or online state.
import { useState, type ReactNode } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/content";

export default function SocialHoverCard({ socialName, href, children }: {
  socialName: string; href: string; children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const handle = socialName === "GitHub" ? "@prx-my" : socialName === "LinkedIn" ? "in/prxmy" : "@_prxmy";
  return (
    <HoverCard.Root open={open} onOpenChange={setOpen} openDelay={180} closeDelay={120}>
      <HoverCard.Trigger asChild>
        <a href={href} target="_blank" rel="noopener noreferrer" className="social-pill">{children}</a>
      </HoverCard.Trigger>
      <AnimatePresence>
        {open && <HoverCard.Portal forceMount><HoverCard.Content asChild forceMount side="bottom" align="center" sideOffset={9}>
          <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0,y:3}} transition={{duration:.16}} className="social-profile-card">
            <div className="social-profile-heading">
              <Image src="/portfolio/avatar.png" alt="" width={44} height={44} />
              <div><p>{profile.name}</p><span>{handle}</span></div>
            </div>
            <p className="social-profile-bio">{profile.role}</p>
            <p className="social-profile-location">{profile.location}</p>
            <p className="social-profile-network">Connect on {socialName} ↗</p>
          </motion.div>
        </HoverCard.Content></HoverCard.Portal>}
      </AnimatePresence>
    </HoverCard.Root>
  );
}
