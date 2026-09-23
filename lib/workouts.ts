export type Workout = {
  id: number;
  slug: string;
  code: "Alpha" | "Bravo" | "Charlie" | "Delta" | "Echo";
  focus: string;
  driveFileId: string;
};

export const workouts: Workout[] = [
  { id: 1, slug: "01-alpha-peito-triceps-perna", code: "Alpha", focus: "Peito, tríceps e perna", driveFileId: "1th_JxC2ZulUa46TMvCEpWSP3qfygby0z" },
  { id: 2, slug: "02-alpha-costas-biceps", code: "Alpha", focus: "Costas e bíceps", driveFileId: "1OrNO5JsxTqVSv3qMDOZgEbxeMGuh_jfz" },
  { id: 3, slug: "03-bravo-ombro-perna", code: "Bravo", focus: "Ombro e perna", driveFileId: "16uFbORuhT_QxRJQjat9Uc_iqMnTFm9zW" },
  { id: 4, slug: "04-charlie-costas-pernas-biceps", code: "Charlie", focus: "Costas, pernas e bíceps", driveFileId: "120WOwe27yHHbnBFL3d1lLTCVEfcqLhOR" },
  { id: 5, slug: "05-charlie-abdomen", code: "Charlie", focus: "Abdômen", driveFileId: "1FBVE9i6HfwYtWtJNpii2WLBSfdlcMBpo" },
  { id: 6, slug: "06-delta-peito-biceps", code: "Delta", focus: "Peito e bíceps", driveFileId: "1ySmXWmtHmg8027mWjjgWORfk4y_Zl3jV" },
  { id: 7, slug: "07-alpha-costas-triceps-pernas", code: "Alpha", focus: "Costas, tríceps e pernas", driveFileId: "1WP7SMKr5bj1eEhw9RAhs1MlrTIlHNJOR" },
  { id: 8, slug: "08-echo-ombros-panturrilhas", code: "Echo", focus: "Ombros e panturrilhas", driveFileId: "1wphP404GWYMUxiVm9BCQw_GBsTSnLJoO" },
  { id: 9, slug: "09-echo-biceps-triceps", code: "Echo", focus: "Bíceps e tríceps", driveFileId: "1oPIeBOAiimFV-KP0uZ8Zwu10gwfwf1IM" },
  { id: 10, slug: "10-bravo-pernas-abdomen", code: "Bravo", focus: "Pernas e abdômen", driveFileId: "1MUjXbY4zGoC7bekyidNPhvJ_jyr_plRX" },
  { id: 11, slug: "11-delta-costas", code: "Delta", focus: "Costas", driveFileId: "1NSGXImpU4e2JEdD65dEoZFUSH-nwraTU" },
  { id: 12, slug: "12-echo-ombros-peitos", code: "Echo", focus: "Ombros e peito", driveFileId: "1DSKa1kWb0WUucRzitezLvb_fbhpgq382" },
  { id: 13, slug: "13-alpha-pernas-abdomen", code: "Alpha", focus: "Pernas e abdômen", driveFileId: "1xCQRd9JFMaPTD7ChhPZD8wHteeV-Bw-Z" },
  { id: 14, slug: "14-charlie-costas", code: "Charlie", focus: "Costas", driveFileId: "13aO6IiP4bS5DE-EqFI92M2890YHCc-4h" },
  { id: 15, slug: "15-echo-pernas", code: "Echo", focus: "Pernas", driveFileId: "1A5pFxUdG8DktnYNmSocpVGvrW9pnfbYv" },
  { id: 16, slug: "16-charlie-peitos-pernas", code: "Charlie", focus: "Peito e pernas", driveFileId: "1WGJnuOSZvrywmSJivSuc4c9LufvtZtCQ" },
  { id: 17, slug: "17-delta-ombros-costas", code: "Delta", focus: "Ombros e costas", driveFileId: "1JZOgEpp0LXpOSlW4vxpc243wq3EPCPOF" },
  { id: 18, slug: "18-bravo-costas-biceps-abdomen", code: "Bravo", focus: "Costas, bíceps e abdômen", driveFileId: "1PpuKZzciJuMZ0y6jsAX3pD5QfTtn14Sc" },
  { id: 19, slug: "19-charlie-pernas-abdomen", code: "Charlie", focus: "Pernas e abdômen", driveFileId: "12AaeOa2o0xN7VvlSvXRTWtbd6ACchm3r" },
  { id: 20, slug: "20-bravo-biceps-triceps-panturrilha", code: "Bravo", focus: "Bíceps, tríceps e panturrilha", driveFileId: "1um0YLGPJznqd4o8ae9dOXZagSeVYQ8Bk" },
  { id: 21, slug: "21-bravo-peitos-costas-abdomen", code: "Bravo", focus: "Peito, costas e abdômen", driveFileId: "1nTm2jQQG4psz-m7wo44FU-KuwnvnllMX" },
];

export function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getWorkout(slug: string) {
  return workouts.find((workout) => workout.slug === slug);
}
