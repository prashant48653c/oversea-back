import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

class LandingService {
  constructor() {}

  async createCarousel(image: string) {
    // const doesExist = await prisma.carousel.findFirst();
    // if (doesExist) {
    //   const carousel = await prisma.carousel.update({where:{id:doesExist.id},data:{image}})
    //   return carousel;
    // }
    const carousel = await prisma.carousel.create({
      data: { image },
    });
    return carousel;
  }

  async getCarousel() {
    const carousel = await prisma.carousel.findFirst();
    return carousel;
  }


 
  getStat = async () => {
  return await prisma.stat.findFirst();
};

  updateStat = async (data: Partial<{
  years: number;
  placements: number;
  services: number;
  countriesServed: number;
  team: number;
  database: number;
}>) => {

  const existing = await prisma.stat.findFirst();
const sanitizedData = {
    years: data.years !== undefined && Number(data.years) ,
    placements: data.placements !== undefined ? Number(data.placements) : undefined,
    services: data.services !== undefined ? Number(data.services) : undefined,
    countriesServed: data.countriesServed !== undefined ? Number(data.countriesServed) : undefined,
    team: data.team !== undefined ? Number(data.team) : undefined,
    database: data.database !== undefined ? Number(data.database) : undefined,
  };
  if (!existing) {
    return await prisma.stat.create({ data: sanitizedData as any });
  }

  return await prisma.stat.update({
    where: { id: existing.id },
    data,
  });
};



 getAllServices = async () => {
  return await prisma.service.findMany();
};

 createService = async (data: {
  image: string;
  serviceType: string;
}) => {
  return await prisma.service.create({ data });
};

 deleteService = async (id: number) => {
  return await prisma.service.delete({ where: { id } });
};



getAllPartners = async () => {
  return await prisma.partner.findMany();
};

createPartner = async (data: {  image: string }) => {
  return await prisma.partner.create({ data });
};

 deletePartner = async (id: number) => {
  return await prisma.partner.delete({ where: { id } });
};





 getAllTeam = async () => {
  return await prisma.team.findMany();
};

createTeamMember = async (data: {
  name: string;
  address: string;
  role: string;
  title: string;
  linkedin: string;
  email: string;
  link: string;
  profileImg: string;
}) => {
  const team= await prisma.team.create({ data });
  console.log(team)
  return team;
};

updateTeamMember = async (
  id: number,
  data: Partial<{
    name: string;
    address: string;
    role: string;
    title: string;
    linkedin: string;
    email: string;
    link: string;
    profileImg: string;
  }>
) => {
  return await prisma.team.update({
    where: { id },
    data,
  });
};

 deleteTeamMember = async (id: number) => {
  return await prisma.team.delete({ where: { id } });
};




// OVerview api

 async getOverviewStats() {
    const [carousels, services, partners, team, testimonials, blogs] = await Promise.all([
      prisma.carousel.count(),
      prisma.service.count(),
      prisma.partner.count(),
      prisma.team.count(),
      prisma.testimonial.count(),
      prisma.blog.count(),
    ]);

    return {
      carousels,
      services,
      partners,
      team,
      testimonials,
      blogs,
    };
  }




  async getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async createTestimonial(data: {
  logo: string;
  title: string;
  subtitle: string;
  content: string;
}) {
  return await prisma.testimonial.create({ data });
}

async updateTestimonial(id: number, data: Partial<{
  logo: string;
  title: string;
  subtitle: string;
  content: string;
}>) {
  return await prisma.testimonial.update({
    where: { id },
    data,
  });
}

async deleteTestimonial(id: number) {
  return await prisma.testimonial.delete({
    where: { id },
  });
}



async getBlogs() {
  return await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async getBlogById(id: number) {
  return await prisma.blog.findUnique({
    where: { id },
  });
}

async createBlog(data: {
  thumbnailImg: string;
  title: string;
  content: string;
}) {
  return await prisma.blog.create({ data });
}

async updateBlog(id: number, data: Partial<{
  thumbnailImg: string;
  title: string;
  content: string;
}>) {
  return await prisma.blog.update({
    where: { id },
    data,
  });
}

async deleteBlog(id: number) {
  return await prisma.blog.delete({
    where: { id },
  });
}



async getCareers() {
  return await prisma.career.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async createCareer(data: {
  name: string;
  email: string;
  phoneNumber: string;
  resume: string;
}) {
  return await prisma.career.create({ data });
}


async getFeedbacks() {
  return await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async createFeedback(data: {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}) {
  return await prisma.feedback.create({ data });
}


}

export const landingService = new LandingService();
