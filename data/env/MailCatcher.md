### Tools: MailCatcher

#### What is MailCatcher?

Catches mail and serves it through a dream.

MailCatcher runs a super simple SMTP server which catches any message sent to it to display in a web interface.

* **Website & Documentation:** [mailcatcher.me](https://mailcatcher.me)

#### Container

* **Image used:** [tophfr/mailcatcher](https://hub.docker.com/r/tophfr/mailcatcher/)

##### Usage

To use MailCatcher, simply configure your mail sending library to send your mail with the SMTP of MailCatcher :

* **host:** `mailcatcher`
* **port:** `25`

Then you can see the captured mail in the embedded MailCatcher webmail at [localhost:8004](http://localhost:8004).

