const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs');

class Courses {
    constructor(title, price, imageUrl) {
        this.id = uuidv4(); 
        this.title = title;
        this.price = price;
        this.image = imageUrl;
    }

    toJSON() {
        return {
           id: this.id,
           title: this.title,
           price: this.price,
           img: this.image
        }
    }

    static async update(course) {
        const courses = await Courses.getAll();
        const idx = courses.findIndex(c => c.id === course.id);

        courses[idx] = course;
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });

    }

    async save() {
        const courses = await Courses.getAll();
        courses.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            )
        });
    }

    static async getById(id) {
        const courses = await Courses.getAll();
        return courses.find(c => c.id === id);
    }
}

module.exports = Courses;


