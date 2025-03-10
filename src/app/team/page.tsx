"use client";
import {PageSection} from "@components/layoutStyles";
import styled from "styled-components";
import Link from "next/link";
import {Fragment, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

type member = {
	name: string;
	role: string;
	image: string;
	bio: string;
}

const team_members: member[] = [
	{
		name: "SkyKing_PX",
		role: "Team Lead",
		image: "/team/profiles/skyking_px.jpg",
		bio: "John is the founder of EmberForge and has over 10 years of experience in the tech industry.",
	},
	{
		name: "Banikula",
		role: "Organization Manager",
		image: "/team/profiles/john_doe.jpg",
		bio: "John is the founder of EmberForge and has over 10 years of experience in the tech industry.",
	},
	{
		name: "Fox",
		role: "Community Manager",
		image: "/team/profiles/john_doe.jpg",
		bio: "John is the founder of EmberForge and has over 10 years of experience in the tech industry.",
	},
	{
		name: "Mikeland",
		role: "Accountent",
		image: "/team/profiles/john_doe.jpg",
		bio: "John is the founder of EmberForge and has over 10 years of experience in the tech industry.",
	},
	{
		name: "The Panda Oliver",
		role: "Developer",
		image: "/team/profiles/john_doe.jpg",
		bio: "John is the founder of EmberForge and has over 10 years of experience in the tech industry.",
	},
	{
		name: "Kobolt",
		role: "Developer",
		image: "/team/profiles/john_doe.jpg",
		bio: "John is the founder of EmberForge and has over 10 years of experience in the tech industry.",
	},
	{
		name: "Kalarian",
		role: "Developer",
		image: "/team/profiles/john_doe.jpg",
		bio: "John is the founder of EmberForge and has over 10 years of experience in the tech industry.",
	},
	{
		name: "Gentra",
		role: "Lead of Content Creation",
		image: "/team/profiles/john_doe.jpg",
		bio: "John is the founder of EmberForge and has over 10 years of experience in the tech industry.",
	}
];

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;

	justify-content: center;
	justify-self: center;

	padding: 2rem;
	width: 100%;
	max-width: 80rem;

	& > * {
		flex: 0 0 14rem;
	}
`;

const StyledLink = styled(Link)`
	width: fit-content;

	padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);

	transition: background-color var(--default-transition-duration) var(--default-transition-timing-function);

	border-radius: var(--radius-lg);

	&:hover {
		background-color: rgba(0, 0, 0, 0.3);

		@media (prefers-color-scheme: dark) {
			background-color: rgba(255, 255, 255, 0.3);
		}
	}

	&:active {
		background-color: rgba(0, 0, 0, 0.2);

		@media (prefers-color-scheme: dark) {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
`;

export default function Team() {
	const [selectedMember, setSelectedMember] = useState<member>(team_members[0]);
	const searchParams = useSearchParams();
	const memberParam = searchParams.get("member");

	useEffect(() => {
		if (memberParam !== null && !isNaN(parseInt(memberParam)))
			setSelectedMember(team_members[parseInt(memberParam)]);
	}, [memberParam]);

	function Member({member}: {member: member}) {
		return (
			<StyledLink href={`?member=${team_members.indexOf(member)}`} className={"flex flex-col items-center gap-2"}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={member.image} alt={member.name} className={"rounded-full w-full aspect-square object-cover"}/>
				<p className={"text-xl"}>{member.name}</p>
				<p>{member.role}</p>
			</StyledLink>
		);
	}

	return (
		<Fragment>
			<PageSection>
				<h1 className={"text-center text-4xl"}>Meet the team</h1>
				<Grid>
					{
						team_members.map((value, index) => (<Member member={value} key={index}/>))
					}
				</Grid>
			</PageSection>

			<MemberPopup member={selectedMember} open={memberParam !== null}/>
		</Fragment>
	);
}

/* Popup */

function MemberPopup({member, open}: {member: member, open: boolean}) {
	const router = useRouter();

	function closePopup() {
		router.push("?");
	}

	return (
		<div className={`fixed top-0 left-0 w-full h-full z-50 bg-black/40 transition-opacity duration-300 
		flex justify-center items-center
		${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={closePopup}>
			<div className={`bg-stone-100 dark:bg-stone-950 p-4 rounded-xl w-full h-fit 
			border-2 border-stone-300 dark:border-stone-800
			flex flex-row gap-4 max-w-4xl`}>
				<div className={"flex flex-row gap-4"}>
					<div className={"max-w-md justify-center justify-items-center"}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={member?.image} alt={member?.name}
						     className={"rounded-full size-32 aspect-square object-cover"}/>
						<h2 className={"text-3xl text-center"}>{member?.name}</h2>
						<p className={"text-center"}>{member?.role}</p>
					</div>
					<div>
						<div className={"ml-auto w-fit"}>
							<Link href={"?"} className={`rounded-full p-2 transition-colors size-32
					hover:bg-black/30 active:bg-black/20
					dark:hover:bg-white/30 dark:active:bg-white/20`}>
								X
							</Link>
						</div>
						<p>{member.bio}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
