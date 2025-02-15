"use strict";

const { create } = require('hbs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert("Blogs", [
			{
				authorId: 1,
				title: "Postgres Is Cool",
        image: "/img/no-image.jpg",
        content: "WEBSITE.CO.ID, TEMPAT –– Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium inventore voluptates sint similique laboriosam sed tempora ratione nesciunt? Consectetur eaque molestiae harum omnis, voluptas itaque enim! Vel placeat, aliquam itaque, odit deleniti temporibus dolore libero quis provident distinctio inventore? Enim, distinctio maxime blanditiis mollitia repudiandae dolorum optio quas laborum voluptas, dolorem nemo? Atque quasi quidem cupiditate eos consequatur tempore officiis suscipit pariatur ipsum id ratione saepe accusamus, odio necessitatibus! Esse mollitia adipisci in ullam ad incidunt modi perspiciatis alias doloremque?",
        createdAt: new Date(),
        updatedAt: new Date(),
			},
      {
				authorId: 1,
				title: "Javascript Is Awesome",
        image: "/img/no-image.jpg",
        content: "WEBSITE.CO.ID, TEMPAT –– Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, quasi! Doloribus tempore, explicabo impedit quasi provident nemo eum animi assumenda hic perferendis ullam accusamus harum iure suscipit quaerat, ipsum reiciendis alias ducimus enim eius. Neque velit incidunt excepturi maiores! Sint cupiditate tempora nisi odio. Dolores dolore corrupti adipisci illum, veniam totam. Soluta quas accusamus expedita, velit reiciendis officiis et ipsa pariatur aspernatur sequi eligendi, placeat recusandae itaque beatae magni fugiat tenetur tempora, inventore consectetur repudiandae accusantium sit in? Voluptas vitae nihil a quaerat alias corrupti eius, placeat consequuntur sit rem quisquam nostrum mollitia corporis qui explicabo quis maxime voluptatem iure!",
        createdAt: new Date(),
        updatedAt: new Date(),
			},
      {
				authorId: 2,
				title: "Bootstrap As CSS Tools",
        image: "/img/no-image.jpg",
        content: "WEBSITE.CO.ID, TEMPAT –– Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium repellat temporibus cum aspernatur, voluptate nesciunt exercitationem, accusantium ab numquam fugit obcaecati sint harum possimus facere veniam dolorem modi fugiat. Est aperiam culpa quas necessitatibus magnam quibusdam suscipit eius voluptatem sed corporis unde distinctio, nesciunt vel earum dolor aliquam soluta voluptates? Laboriosam, sequi reiciendis possimus veritatis eius reprehenderit animi sint aspernatur rem optio adipisci, ducimus consequatur excepturi quasi molestias odio blanditiis dolorem aliquid a? Quo quidem aut est quam vitae adipisci! Unde aliquid tempore illo labore quia tenetur ipsum molestias laudantium.",
        createdAt: new Date(),
        updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
    return queryInterface.bulkDelete("Blogs", null, {});
	},
};
