import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import { skills, experiences } from '../constants';
import IC from '../components/IC';
import GlitchPageLayout from '../components/GlitchPageLayout';

const About = () => (
  <GlitchPageLayout>
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="text-3xl font-bold text-white sm:text-5xl">
        It's me,{' '}
        <span className="text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text">
          Ritika! (again)
        </span>
      </h1>
      <p className="mt-2 text-sm text-slate-400">I am fine with shorter forms of my name too! (Rit, Ri, Rika, etc.)</p>

      <p className="max-w-3xl mt-6 text-base leading-relaxed text-slate-300">
        I earned my Bachelor's Degree from Truman State University, majoring in Computer Science with a Data Science
        minor. Below are languages, frameworks, databases, and tools I have experience with.
      </p>

      <h2 className="text-white subhead-text mt-14">Skills</h2>
      <div className="flex flex-wrap gap-8 mt-10 sm:gap-12">
        {skills.map((skill) => (
          <div key={skill.name} className="w-20 h-20 block-container">
            <div className="btn-back rounded-xl" />
            <div className="flex items-center justify-center btn-front rounded-xl bg-white/90">
              <img src={skill.imageUrl} alt={skill.name} className="object-contain w-1/2 h-1/2" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-white subhead-text">Work Experience</h2>
        <p className="max-w-3xl mt-4 text-base text-slate-300">
          I worked as Researcher, TA, and other assistant roles; they helped me shape my technical, professional soft skills:
        </p>
        <div className="mt-10 [&_.vertical-timeline-element-content]:!bg-white [&_.vertical-timeline-element-content]:!text-slate-800 [&_.vertical-timeline-element-content]:!shadow-lg">
          <VerticalTimeline>
            {experiences.map((experience) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                dateClassName="!text-emerald-300 !font-medium"
                icon={
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className="h-[60%] w-[60%] object-contain"
                    />
                  </div>
                }
                iconStyle={{ background: experience.iconBg }}
                contentStyle={{
                  borderBottom: '8px',
                  borderStyle: 'solid',
                  borderBottomColor: experience.iconBg,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                }}
              >
                <h3 className="text-lg font-semibold font-poppins text-slate-900">{experience.title}</h3>
                <p className="font-medium text-teal-700 font-base">{experience.company_name}</p>
                <ul className="my-5 ml-5 space-y-2 list-disc">
                  {experience.points.map((point, index) => (
                    <li key={`experience-point-${index}`} className="pl-1 text-sm text-slate-600">
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className="my-12 border-white/10" />
      <div className="text-slate-200 [&_a]:text-emerald-300">
        <IC />
      </div>
    </motion.div>
  </GlitchPageLayout>
);

export default About;
