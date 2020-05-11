/* becodeorg/cli
 *
 * /src/commands/directory/details.js - Director Command: details
 *
 * coded by leny@BeCode
 * started at 11/05/2020
 */

import chalk from "chalk";
import ora from "ora";
import dayjs from "dayjs";
import {userRequest, getContext} from "../../core/graph";
import reporter from "../../core/reporter";
import got from "got";
import * as image from "terminal-image";

const gql = String.raw;

const DATE_FORMAT = "D MMM YYYY";

const spinner = ora();

export const showDetails = async (context, type, slug, withId = false) => {
    spinner.start("Fetching data…");

    const {person} = await userRequest(
        gql`
            query person($type: PersonType!, $slug: String!) {
                person(type: $type, slug: $slug) {
                    __typename
                    uid
                    slug
                    firstname
                    lastname
                    ... on Junior {
                        avatar
                        name
                        promo {
                            displayname
                            school {
                                name
                            }
                        }
                        contact {
                            phone
                            email
                            privateEmail
                        }
                        ryver {
                            id
                            username
                        }
                        github {
                            name
                            url
                        }
                        linkedin {
                            slug
                            url
                        }
                        discord {
                            username
                            discriminator
                        }
                        age
                        birthdate {
                            timestamp
                        }
                    }
                    ... on Coach {
                        avatar
                        name
                        displayname
                        promos {
                            displayname
                            school {
                                name
                            }
                        }
                        contact {
                            phone
                            email
                            privateEmail
                        }
                        ryver {
                            id
                            username
                        }
                        discord {
                            username
                            discriminator
                        }
                        coachGithub: github {
                            name
                            url
                        }
                        coachLinkedin: linkedin {
                            slug
                            url
                        }
                        age
                        birthdate {
                            timestamp
                        }
                    }
                    ... on Staff {
                        avatar
                        name
                        displayname
                        rolename
                        contact {
                            phone
                            email
                            privateEmail
                        }
                        ryver {
                            id
                            username
                        }
                        discord {
                            username
                            discriminator
                        }
                        staffLinkedin: linkedin {
                            slug
                            url
                        }
                        age
                        birthdate {
                            timestamp
                        }
                    }
                }
            }
        `,
        {type: type.toUpperCase(), slug},
        context,
    );

    spinner.succeed();

    reporter.log("");

    if (person.displayname) {
        reporter.log(
            `${person.displayname} - ${chalk.cyan(
                `${person.firstname} ${person.lastname.toUpperCase()}`,
            )} (${chalk.yellow(person.__typename)})`,
        );
    } else {
        reporter.log(
            `${
                person.firstname
            } ${person.lastname.toUpperCase()} (${chalk.yellow(
                person.__typename,
            )})`,
        );
    }

    if (person.avatar) {
        const raw = await got(person.avatar).buffer();
        const content = await image.buffer(raw, {
            preserveAspectRatio: true,
            width: 25,
        });

        reporter.log("");
        reporter.log(content);
    }

    reporter.log(
        `${chalk.cyan("Age:")} ${person.age} ${
            person.birthdate
                ? `${chalk.blue(
                      `(${dayjs(person.birthdate.timestamp).format(
                          DATE_FORMAT,
                      )})`,
                  )}`
                : ""
        }`,
    );

    switch (person.__typename) {
        case "Staff":
            reporter.log(`${chalk.cyan("Role:")} ${person.rolename}`);
            break;

        case "Coach":
            reporter.log(chalk.cyan("Promos:"));
            (person.promos || []).map(({displayname, school: {name}}) =>
                reporter.log(`  • ${displayname} (${chalk.blue(name)})`),
            );
            break;

        case "Junior":
            reporter.log(
                `${chalk.cyan("Promo:")} ${
                    person.promo.displayname
                } (${chalk.blue(person.promo.school.name)})`,
            );
            break;

        // no default
    }

    person.contact.phone &&
        reporter.log(`${chalk.cyan("Phone:")} ${person.contact.phone}`);

    person.contact.email &&
        reporter.log(
            `${chalk.cyan(
                person.__typename === "Junior" ? "Email Alias" : "Email:",
            )} ${person.contact.email}`,
        );

    person.contact.privateEmail &&
        reporter.log(
            `${chalk.cyan(
                person.__typename === "Junior" ? "Email:" : "Private Email:",
            )} ${person.contact.privateEmail}`,
        );

    person.ryver &&
        reporter.log(`${chalk.cyan("Ryver:")} ${person.ryver.username}`);

    const github = person.coachGithub || person.github;

    github &&
        reporter.log(
            `${chalk.cyan("GitHub:")} https://github.com/${chalk.blue(
                github.name,
            )}`,
        );

    const linkedin =
        person.staffLinkedin || person.coachLinkedin || person.linkedin;

    linkedin &&
        reporter.log(
            `${chalk.cyan("LinkedIN:")} https://linkedin.com/in/${chalk.blue(
                linkedin.slug,
            )}`,
        );

    person.discord &&
        reporter.log(
            `${chalk.cyan("Discord:")} ${person.discord.username}${chalk.blue(
                `#${person.discord.discriminator}`,
            )}`,
        );

    if (withId) {
        reporter.log("");
        reporter.log(chalk.yellow("* * *"));
        reporter.log(`${chalk.bold.yellow("UID:")} ${person.uid}`);
        reporter.log(`${chalk.bold.yellow("Slug:")} ${person.slug}`);
        reporter.log(chalk.yellow("* * *"));
    }
};

export default async function (_, cmd) {
    const context = getContext(cmd);
    const [, type, slug] = cmd.args;

    try {
        await showDetails(context, type, slug, cmd.withId);

        process.exit(0);
    } catch (error) {
        spinner.fail();
        reporter.die(`${error.message || error}`);
    }
}
