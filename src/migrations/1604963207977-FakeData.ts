import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakeData1604963207977 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`insert into post (title, text, "creatorId", "createdAt") values ('My Friend Ivan Lapshin (Moy drug Ivan Lapshin)', 'Sadye', 1, '2020-07-13T18:47:25Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Babe Ruth Story, The ', 'Haywood', 1, '2020-09-28T16:35:20Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Julian Po', 'Clair', 1, '2020-10-14T00:16:42Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Six by Sondheim', 'Luce', 1, '2020-04-16T03:52:22Z');
        insert into post (title, text, "creatorId", "createdAt") values ('December 7th', 'Cornall', 1, '2020-06-23T00:08:09Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Croupier', 'Mathian', 1, '2020-04-22T08:10:10Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Shogun Assassin', 'Rochester', 1, '2020-01-30T21:47:16Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Woman on Top', 'Hartwell', 1, '2020-02-10T02:49:26Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Ca$h', 'Angy', 1, '2020-08-13T02:14:31Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Everlasting Piece, An', 'Tomkin', 1, '2020-04-18T11:40:44Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Something Ventured', 'Raquela', 1, '2020-05-01T07:25:55Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Red Squirrel, The (Ardilla roja, La)', 'Boniface', 1, '2020-05-11T16:50:50Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Parade', 'Loria', 1, '2020-02-19T21:35:10Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Small Time', 'Hank', 1, '2019-11-27T12:44:42Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Feast III: The Happy Finish', 'Carol-jean', 1, '2020-08-12T18:51:56Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Barnacle Bill', 'Anna', 1, '2020-06-02T21:07:21Z');
        insert into post (title, text, "creatorId", "createdAt") values ('A Christmas Kiss', 'Ricki', 1, '2019-12-19T09:30:31Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Get a Horse!', 'Ash', 1, '2020-11-05T05:33:04Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Hard Corps, The', 'Cathyleen', 1, '2020-04-17T22:36:06Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Beat Street', 'Wilfred', 1, '2020-10-22T11:03:04Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Candyman 3: Day of the Dead', 'Masha', 1, '2020-06-30T18:03:07Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Raintree County', 'Isaak', 1, '2020-07-10T05:20:28Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Saddest Music in the World, The', 'Dottie', 1, '2020-09-11T18:47:25Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Mahakaal (The Monster)', 'Nike', 1, '2020-09-23T05:15:39Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Reagan', 'Abey', 1, '2020-06-05T07:00:13Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Lolita', 'Darill', 1, '2020-09-10T16:58:00Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Zuzu Angel', 'Aeriel', 1, '2020-01-04T08:42:19Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Violent Men, The', 'Gardener', 1, '2020-01-09T06:45:57Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Paris-Manhattan', 'Emmy', 1, '2020-08-11T20:32:55Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Halloween Tree, The', 'Alika', 1, '2020-07-01T13:09:57Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Ghosts of Mississippi', 'Anne-marie', 1, '2020-09-18T21:17:29Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Most Dangerous Game, The', 'Rozanne', 1, '2020-04-06T06:03:19Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Backlash', 'Honoria', 1, '2020-06-25T23:06:44Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Hero', 'Jed', 1, '2019-11-29T16:07:21Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Cromwell', 'Tymothy', 1, '2020-01-21T19:45:45Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Little Big Man', 'Klaus', 1, '2020-01-12T23:20:51Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Batman', 'Elga', 1, '2019-11-10T03:08:15Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Emma', 'Conant', 1, '2020-08-21T07:29:09Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Fugitives (Fugitivas)', 'Kathe', 1, '2020-04-28T14:20:14Z');
        insert into post (title, text, "creatorId", "createdAt") values ('CBGB', 'Crista', 1, '2020-09-03T10:39:49Z');
        insert into post (title, text, "creatorId", "createdAt") values ('One in a Million: The Ron LeFlore Story', 'Carmelita', 1, '2020-08-27T14:58:39Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Jam', 'Brenn', 1, '2020-01-01T23:07:11Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Witnesses, The (Les témoins)', 'Theodora', 1, '2019-12-18T05:35:17Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Moving Midway', 'Dorthy', 1, '2020-10-04T06:16:03Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Polite People (Kurteist fólk)', 'Adelind', 1, '2020-06-21T14:26:05Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Jason''s Lyric', 'Alikee', 1, '2020-01-03T16:59:28Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Alpha and Omega 2: A Howl-iday Adventure (Alpha & Omega 2)', 'Quill', 1, '2020-04-01T14:55:31Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Angel Dog', 'Brook', 1, '2020-10-15T15:48:57Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Spring Breakdown', 'Kari', 1, '2020-02-25T17:33:40Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Band of Brothers', 'Farlay', 1, '2020-04-20T00:49:01Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Knightriders', 'Kendricks', 1, '2020-08-16T05:30:43Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Mudlark, The', 'Raymond', 1, '2020-05-23T00:30:56Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Blonde Venus', 'Dunstan', 1, '2020-10-31T23:27:58Z');
        insert into post (title, text, "creatorId", "createdAt") values ('You Kill Me', 'Ola', 1, '2020-04-22T07:02:29Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Must Have Been Love', 'Mikkel', 1, '2020-07-23T01:49:24Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Nightwatch (Nattevagten)', 'Kaile', 1, '2020-05-29T17:45:03Z');
        insert into post (title, text, "creatorId", "createdAt") values ('See What I''m Saying: The Deaf Entertainers Documentary', 'Jon', 1, '2020-02-16T17:36:16Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Home of the Brave', 'Ring', 1, '2019-11-21T02:03:04Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Green Dolphin Street', 'Matilda', 1, '2019-12-23T03:12:51Z');
        insert into post (title, text, "creatorId", "createdAt") values ('The Gruffalo''s Child', 'Lewiss', 1, '2020-10-27T10:18:30Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Green Years, The', 'Jackqueline', 1, '2020-07-08T08:00:08Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Red White & Blue', 'Lucine', 1, '2020-08-25T01:09:08Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Craig Ferguson: Does This Need to Be Said?', 'Betteanne', 1, '2020-07-25T13:48:32Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Black White + Gray: A Portrait of Sam Wagstaff and Robert Mapplethorpe ', 'Griz', 1, '2020-10-31T05:01:30Z');
        insert into post (title, text, "creatorId", "createdAt") values ('L.A. Confidential', 'Violette', 1, '2020-06-10T23:14:43Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Pitkä kuuma kesä', 'Jan', 1, '2020-06-02T10:51:10Z');
        insert into post (title, text, "creatorId", "createdAt") values ('G.I. Jane', 'Staffard', 1, '2020-07-06T11:50:08Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Kalevala - Uusi aika', 'Ferrell', 1, '2020-10-26T03:53:18Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Zathura', 'Philippine', 1, '2020-09-13T08:29:00Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Monty Python Live at the Hollywood Bowl', 'Anastasia', 1, '2020-03-26T23:41:01Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Sheriff and the Satellite Kid, The', 'Vernor', 1, '2020-04-13T06:24:09Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Rogue Cop', 'Tomasine', 1, '2020-03-22T19:43:33Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Ultimate Gift, The', 'Hewie', 1, '2020-01-04T05:19:37Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Albino Alligator', 'Brian', 1, '2020-08-20T15:26:39Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Against The Sun', 'Margaret', 1, '2020-10-05T00:42:48Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Happy End', 'Shelly', 1, '2020-01-08T05:40:54Z');
        insert into post (title, text, "creatorId", "createdAt") values ('FBI: Frikis buscan incordiar', 'Bert', 1, '2020-01-24T06:37:17Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Pippi on the Run (På rymmen med Pippi Långstrump)', 'Rani', 1, '2020-07-12T13:39:43Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Pornstar: The Legend of Ron Jeremy', 'Arlinda', 1, '2019-12-17T09:00:00Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Robot', 'Gisela', 1, '2020-01-27T06:01:14Z');
        insert into post (title, text, "creatorId", "createdAt") values ('The Hunchback of Paris', 'Sigismond', 1, '2020-11-07T21:28:12Z');
        insert into post (title, text, "creatorId", "createdAt") values ('New Police Story (Xin jing cha gu shi)', 'Lane', 1, '2019-12-22T22:44:59Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Remember Sunday', 'Anna', 1, '2020-03-21T07:59:30Z');
        insert into post (title, text, "creatorId", "createdAt") values ('The Plague of the Zombies', 'Roslyn', 1, '2020-07-15T17:06:27Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Ultimate Warrior, The', 'Hugues', 1, '2020-05-11T15:26:37Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Mirrors 2', 'Edyth', 1, '2020-11-08T15:21:25Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Prime Suspect', 'Jordan', 1, '2020-07-27T23:40:06Z');
        insert into post (title, text, "creatorId", "createdAt") values ('McLintock!', 'Janeen', 1, '2020-08-02T22:06:04Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Slasher House', 'Cherin', 1, '2020-03-10T23:07:11Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Mater and the Ghostlight', 'Romonda', 1, '2020-03-24T17:04:05Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Crush, The', 'Kelly', 1, '2020-10-22T15:13:55Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Bill Maher: Victory Begins at Home', 'Deena', 1, '2020-05-11T23:08:28Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Cold Prey II (Fritt Vilt II)', 'Will', 1, '2020-03-10T04:37:33Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Springfield Rifle', 'Jade', 1, '2020-02-20T20:32:37Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Pay or Die', 'Germana', 1, '2020-05-06T17:17:36Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Chinese Ghost Story II, A (Sien nui yau wan II yan gaan do)', 'Bryn', 1, '2020-05-19T14:09:51Z');
        insert into post (title, text, "creatorId", "createdAt") values ('I Am Fishead', 'Cleo', 1, '2020-10-15T18:52:47Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Psycho II', 'Cory', 1, '2020-04-15T09:23:57Z');
        insert into post (title, text, "creatorId", "createdAt") values ('National Lampoon''s Van Wilder: The Rise of Taj', 'Charyl', 1, '2019-12-20T11:10:22Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Guilty Hands', 'Ilyse', 1, '2020-11-05T16:08:31Z');`);
	}

	public async down(_: QueryRunner): Promise<void> {}
}
